import React, { useRef, useEffect, useMemo } from "react"
import dynamic from 'next/dynamic'

interface NetworkConfig {
  numAgents: number
  agentSpeed: number
  messageSpeed: number
  connectionDistance: number
  messageFrequency: number
  agentTypes: string[]
}

interface NetworkBackgroundAnimationProps {
  config?: Partial<NetworkConfig>
  className?: string
}

// Default configuration
const defaultConfig: NetworkConfig = {
  numAgents: 40,
  agentSpeed: 0.4,
  messageSpeed: 2,
  connectionDistance: 180,
  messageFrequency: 0.02,
  agentTypes: ["primary", "secondary", "tertiary"],
}

function NetworkBackgroundAnimation({
  config: userConfig = {},
  className = "absolute inset-0 w-full h-full z-0",
}: NetworkBackgroundAnimationProps) {
  // Memoize config to prevent unnecessary re-renders
  const config = useMemo(() => ({ ...defaultConfig, ...userConfig }), [JSON.stringify(userConfig)])
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  // Reverting type to 'any[]' as it was before the fixes
  const agentsRef = useRef<any[]>([]) 
  const animationFrameIdRef = useRef<number | null>(null)
  const bgColorRef = useRef<string>('#ffffff') // Default fallback
  const responsiveConnectionDistanceRef = useRef<number>(config.connectionDistance); // Ref for responsive distance

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;


    // Dynamically get computed background color
    try {
      // Ensure canvas is in the DOM and styled before reading
      const computedBg = window.getComputedStyle(canvas).getPropertyValue('--background').trim();
      if (computedBg) {
        bgColorRef.current = computedBg;
      } else {
        console.warn("Could not compute background color, using fallback.");
      }
    } catch (error) {
       console.error("Error getting computed style:", error);
       // Use fallback if error occurs
    }


    // Set canvas dimensions
    let dpr = 1; // Store dpr for use in animate
    const resizeCanvas = () => {
      dpr = window.devicePixelRatio || 1 // Update dpr on resize
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      // No ctx.scale needed here if drawing coords are scaled

      // Calculate responsive connection distance
      const logicalWidth = rect.width; // Use logical width for scaling reference
      const baseDistance = config.connectionDistance;
      const referenceWidth = 1920; // Example reference width
      // Scale based on width, clamp between reasonable values (e.g., 80-300)
      responsiveConnectionDistanceRef.current = Math.max(80, Math.min(300, baseDistance * (logicalWidth / referenceWidth)));
    };

    resizeCanvas() // Call initially to set distance
    window.addEventListener("resize", resizeCanvas)

    // --- Move classes back inside useEffect ---
    // Create agents representing AI entities
    type AgentType = "primary" | "secondary" | "tertiary";
    agentsRef.current = [];

    class Message {
        source: Agent;
        target: Agent;
        // type: "request" | "response" | "broadcast"; // Reverted type
        type: string;
        x: number;
        y: number;
        speed: number;
        pathPoints: { x: number; y: number }[];
        currentPoint: number;
        completed: boolean;
        color: string;
        // pulseRadius: number; // Removed
        // pulseSpeed: number; // Removed
        size: number; // Added back
        progress: number; // Added back from original

        constructor(source: Agent, target: Agent, type: string) {
          this.source = source;
          this.target = target;
          this.type = type || "data"; // Reverted default type
          this.speed = config.messageSpeed * (0.8 + Math.random() * 0.4); // Reverted speed calc
          this.x = source.x;
          this.y = source.y;
          this.completed = false;
          // this.pulseRadius = 0; // Removed
          // this.pulseSpeed = 0.2; // Removed
          this.size = 2 + Math.random() * 2; // Added back size
          this.pathPoints = this.generatePath(); // Reverted to generatePath
          this.currentPoint = 0;
          this.color = this.getColor(); // Reverted color logic
          this.progress = 0; // Added back from original
        }

        getColor() { // Updated colors for light theme -> Purple theme
          switch (this.type) {
            case "request":
              return "rgba(147, 51, 234, 0.5)" // Purple-600
            case "response":
              return "rgba(126, 34, 206, 0.5)" // Purple-700
            case "broadcast":
              return "rgba(168, 85, 247, 0.5)" // Purple-500
            default:
              return "rgba(139, 92, 246, 0.4)" // Violet-500
          }
        }

        generatePath() { // Reverted path generation
          // Create a slightly curved path between source and target
          const points = []
          const numPoints = 20
          const controlPoint = {
            x: (this.source.x + this.target.x) / 2 + (Math.random() - 0.5) * 80,
            y: (this.source.y + this.target.y) / 2 + (Math.random() - 0.5) * 80,
          }

          for (let i = 0; i <= numPoints; i++) {
            const t = i / numPoints
            const x =
              Math.pow(1 - t, 2) * this.source.x + 2 * (1 - t) * t * controlPoint.x + Math.pow(t, 2) * this.target.x
            const y =
              Math.pow(1 - t, 2) * this.source.y + 2 * (1 - t) * t * controlPoint.y + Math.pow(t, 2) * this.target.y
            points.push({ x, y })
          }
          return points
        }

        update() { // Reverted - removed addAgentOrMessage param
          this.currentPoint += this.speed

          if (this.currentPoint >= this.pathPoints.length - 1) {
            this.completed = true
            // Create a response message with 70% probability
            if (this.type === "request" && Math.random() < 0.7) {
              agentsRef.current.push(new Message(this.target, this.source, "response")) // Reverted direct access
            }
            return
          }

          const pointIndex = Math.floor(this.currentPoint)
          const nextPointIndex = Math.min(pointIndex + 1, this.pathPoints.length - 1)
          const fraction = this.currentPoint - pointIndex

          this.x =
            this.pathPoints[pointIndex].x + (this.pathPoints[nextPointIndex].x - this.pathPoints[pointIndex].x) * fraction
          this.y =
            this.pathPoints[pointIndex].y + (this.pathPoints[nextPointIndex].y - this.pathPoints[pointIndex].y) * fraction
        }

        draw() { // Reverted draw method
          if (!ctx) return

          // Draw message
          ctx.beginPath()
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
          ctx.fillStyle = this.color
          ctx.fill()

          // Draw trail
          const trailLength = 5
          for (let i = 1; i <= trailLength; i++) {
            const trailPointIndex = Math.max(0, Math.floor(this.currentPoint) - i)
            if (trailPointIndex >= 0 && trailPointIndex < this.pathPoints.length) {
              ctx.beginPath()
              ctx.arc(
                this.pathPoints[trailPointIndex].x,
                this.pathPoints[trailPointIndex].y,
                this.size * (1 - i / trailLength),
                0,
                Math.PI * 2,
              )
              // Carefully check string formatting here
              ctx.fillStyle = this.color.replace(")", `, ${0.7 * (1 - i / trailLength)})`)
              ctx.fill()
            }
          }
        }
    }

    class Agent { // Reverted Agent class
      x: number;
      y: number;
      vx: number;
      vy: number;
      type: AgentType;
      radius: number;
      color: string;
      pulseRadius: number;
      isPulsing: boolean;
      connections: Agent[];
      lastMessageTime: number;
      messageThreshold: number;
      id: string;
      processingPower: number;
      dataPoints: { angle: number; height: number }[];
      constructor(type: AgentType = "primary") {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.vx = (Math.random() - 0.5) * config.agentSpeed
        this.vy = (Math.random() - 0.5) * config.agentSpeed
        this.type = type
        this.radius = this.getRadius()
        this.color = this.getColor()
        this.pulseRadius = 0
        this.isPulsing = false
        this.connections = []
        this.lastMessageTime = 0
        this.messageThreshold = 1000 + Math.random() * 4000 // Random threshold between 1-5 seconds
        this.id = Math.random().toString(36).substr(2, 9)
        this.processingPower = 0.5 + Math.random() * 0.5 // Random processing power between 0.5-1
        this.dataPoints = []
        for (let i = 0; i < 8; i++) {
          this.dataPoints.push({
            angle: ((Math.PI * 2) / 8) * i,
            height: 0.5 + Math.random() * 0.5,
          })
        }
      }

      getRadius() {
        switch (this.type) {
          case "primary":
            return 4 + Math.random() * 2
          case "secondary":
            return 3 + Math.random() * 1.5
          case "tertiary":
            return 2 + Math.random() * 1
          default:
            return 3
        }
      }

      getColor() {
        switch (this.type) {
          case "primary":
            return `rgba(147, 51, 234, ${0.4 + Math.random() * 0.2})` // Purple-600
          case "secondary":
            return `rgba(168, 85, 247, ${0.3 + Math.random() * 0.2})` // Purple-500
          case "tertiary":
            return `rgba(168, 85, 247, ${0.3 + Math.random() * 0.2})` // Purple-500
          default:
            return "rgba(139, 92, 246, 0.3)" // Default Violet-500
        }
      }

      update(currentTime: number) { // Reverted - removed addAgentOrMessage and canvas size params
        // Update position with boundary checking
        this.x += this.vx
        this.y += this.vy

        // Bounce off edges with slight randomization
        if (this.x < this.radius || this.x > canvas.width - this.radius) {
          this.vx *= -1
          this.vx += (Math.random() - 0.5) * 0.1 // Add slight randomness
        }
        if (this.y < this.radius || this.y > canvas.height - this.radius) {
          this.vy *= -1
          this.vy += (Math.random() - 0.5) * 0.1 // Add slight randomness
        }

        // Keep within bounds
        this.x = Math.max(this.radius, Math.min(canvas.width - this.radius, this.x))
        this.y = Math.max(this.radius, Math.min(canvas.height - this.radius, this.y))

        // Update pulse effect
        if (this.isPulsing) {
          this.pulseRadius += 0.5
          if (this.pulseRadius > responsiveConnectionDistanceRef.current) { // Use responsive distance
            this.isPulsing = false
            this.pulseRadius = 0
          }
        }

        // Randomly initiate communication
        if (currentTime - this.lastMessageTime > this.messageThreshold) {
          if (Math.random() < config.messageFrequency) {
            this.isPulsing = true
            this.pulseRadius = 0
            this.lastMessageTime = currentTime

            // Find a random connection to send a message to
            if (this.connections.length > 0) {
              const targetAgent = this.connections[Math.floor(Math.random() * this.connections.length)]
              agentsRef.current.push(new Message(this, targetAgent, "request")) // Reverted direct access
            }
          }
        }

        // Animate data points
        this.dataPoints.forEach((point) => {
          point.height = Math.max(0.3, Math.min(1, point.height + (Math.random() - 0.5) * 0.05))
        })
      }

      draw() { // Reverted draw method
        if (!ctx) return

        // Draw agent
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()

        // Draw data visualization around agent
        if (this.type === "primary" || this.type === "secondary") {
          const dataRadius = this.radius * 2

          ctx.beginPath()
          this.dataPoints.forEach((point, i) => {
            const x = this.x + Math.cos(point.angle) * dataRadius * point.height
            const y = this.y + Math.sin(point.angle) * dataRadius * point.height

            if (i === 0) {
              ctx.moveTo(x, y)
            } else {
              ctx.lineTo(x, y)
            }
          })
          ctx.closePath()

          // Extract the base color and create new rgba with modified alpha
          // Carefully check string formatting here
          const colorMatch = this.color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/)
          if (colorMatch) {
            ctx.fillStyle = `rgba(${colorMatch[1]}, ${colorMatch[2]}, ${colorMatch[3]}, 0.2)`
          } else {
            ctx.fillStyle = "rgba(147, 51, 234, 0.2)" // Purple-600
          }
          ctx.fill()
        }

        // Draw pulse effect
        if (this.isPulsing) {
          ctx.beginPath()
          ctx.arc(this.x, this.y, this.pulseRadius, 0, Math.PI * 2)

          // Extract the base color and create new rgba with modified alpha
          // Carefully check string formatting here
          const colorMatch = this.color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/)
          if (colorMatch) {
            ctx.strokeStyle = `rgba(${colorMatch[1]}, ${colorMatch[2]}, ${colorMatch[3]}, 0.3)`
          } else {
            ctx.strokeStyle = "rgba(147, 51, 234, 0.3)" // Purple-600
          }
          ctx.lineWidth = 1
          ctx.stroke()
        }

        // Draw connections
        this.connections.forEach((agent) => {
          const distance = Math.sqrt(Math.pow(this.x - agent.x, 2) + Math.pow(this.y - agent.y, 2))
          if (distance < responsiveConnectionDistanceRef.current) { // Use responsive distance
            ctx.beginPath()
            ctx.moveTo(this.x, this.y)
            ctx.lineTo(agent.x, agent.y)

            // Create gradient for connection with proper color format
            const gradient = ctx.createLinearGradient(this.x, this.y, agent.x, agent.y)

            // Extract the base color and create new rgba with modified alpha
            // Carefully check string formatting here
            const sourceColorMatch = this.color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/)
            const targetColorMatch = agent.color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/)

            if (sourceColorMatch && targetColorMatch) {
              const sourceRgba = `rgba(${sourceColorMatch[1]}, ${sourceColorMatch[2]}, ${sourceColorMatch[3]}, 0.2)`
              const targetRgba = `rgba(${targetColorMatch[1]}, ${targetColorMatch[2]}, ${targetColorMatch[3]}, 0.2)`

              gradient.addColorStop(0, sourceRgba)
              gradient.addColorStop(1, targetRgba)
            } else {
              // Fallback if color parsing fails
              gradient.addColorStop(0, "rgba(147, 51, 234, 0.2)")
              gradient.addColorStop(1, "rgba(139, 92, 246, 0.2)")
            }

            ctx.strokeStyle = gradient
            ctx.lineWidth = 0.5 * (1 - distance / responsiveConnectionDistanceRef.current) // Use responsive distance
            ctx.stroke()
          }
        })
      }
    }
    // --- End Class Definitions ---

    // Initialize agents
    for (let i = 0; i < config.numAgents; i++) {
      const typeIndex = Math.floor(Math.random() * config.agentTypes.length)
      // Ensure type is valid AgentType
      const type = config.agentTypes[typeIndex] as AgentType;
      agentsRef.current.push(new Agent(type));
    }

    // Create connections between agents
    agentsRef.current.forEach((agent) => {
      if (agent instanceof Agent) {
        agent.connections = [];
        agentsRef.current.forEach((otherAgent) => {
          if (otherAgent instanceof Agent && agent !== otherAgent) {
            const distance = Math.sqrt(Math.pow(agent.x - otherAgent.x, 2) + Math.pow(agent.y - otherAgent.y, 2));
            if (distance < responsiveConnectionDistanceRef.current) { // Use responsive distance
              agent.connections.push(otherAgent);
            }
          }
        });
      }
    });

    // Create some initial messages
    for (let i = 0; i < 5; i++) {
      // Only use Agent instances as source
      const agentSources = agentsRef.current.filter(a => a instanceof Agent);
      if (agentSources.length === 0) continue; // Skip if no agents
      const sourceIndex = Math.floor(Math.random() * agentSources.length);
      const source = agentSources[sourceIndex];

      if (source.connections.length > 0) {
        const targetIndex = Math.floor(Math.random() * source.connections.length);
        const target = source.connections[targetIndex];
        agentsRef.current.push(new Message(source, target, "request"));
      }
    }


    // Animation loop
    let lastTime = 0 // Reverted lastTime initialization
    const animate = (currentTime: number) => {
      const deltaTime = currentTime - lastTime // Reverted deltaTime calculation
      lastTime = currentTime

      // Reverted - removed deltaTime check and canvas/ctx check
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Use the computed background color from the ref
      ctx.fillStyle = bgColorRef.current;
      // Adjust fillRect for DPR scaling to cover the logical canvas size
      ctx.fillRect(0, 0, canvas.width, canvas.height); 

      // Add some noise/stars to the background (adjust random position range for DPR)
      for (let i = 0; i < 50; i++) {
        const x = Math.random() * canvas.width / dpr
        const y = Math.random() * canvas.height / dpr
        const radius = Math.random() * 1
        ctx.beginPath()
        ctx.arc(x, y, radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.2})`
        ctx.fill()
      }

      // Update and draw agents
      agentsRef.current.forEach((agent) => {
        if (agent instanceof Agent) {
          agent.update(currentTime) // Reverted - removed params
          agent.draw()
        }
      })

      // Update and draw messages
      for (let i = agentsRef.current.length - 1; i >= 0; i--) {
        const item = agentsRef.current[i];
        if (item instanceof Message) {
          item.update() // Reverted - removed params
          item.draw()

          // Type narrowing already done, just check 'completed'
          if (item.completed) {
            agentsRef.current.splice(i, 1)
          }
        }
      }

      // Occasionally create new connections as agents move (Restored)
      if (Math.random() < 0.01) {
        const allAgents = agentsRef.current.filter(a => a instanceof Agent) as Agent[]; // Filter once
        for (const agent of allAgents) {
          agent.connections = []; // Reset connections
          for (const otherAgent of allAgents) {
            if (agent !== otherAgent) {
              const distance = Math.sqrt(Math.pow(agent.x - otherAgent.x, 2) + Math.pow(agent.y - otherAgent.y, 2));
              if (distance < responsiveConnectionDistanceRef.current) { // Use responsive distance
                agent.connections.push(otherAgent);
              }
            }
          }
        }
      }

      // Occasionally broadcast message from a random primary agent
      if (Math.random() < 0.002) {
        const primaryAgents = agentsRef.current.filter((agent) => agent instanceof Agent && agent.type === "primary") as Agent[];
        if (primaryAgents.length > 0) {
          const broadcaster: Agent = primaryAgents[Math.floor(Math.random() * primaryAgents.length)];
          broadcaster.isPulsing = true; // Reverted pulsing logic
          // broadcaster.pulseRadius = 0; // Removed pulse reset

          // Create broadcast messages to all connected agents
          broadcaster.connections.forEach((target: Agent) => {
            if (target instanceof Agent) {
              agentsRef.current.push(new Message(broadcaster, target, "broadcast"));
            }
          });
        }
      }

      // Reverted animation frame request position
      animationFrameIdRef.current = requestAnimationFrame(animate)
    }

    animate(0)

    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current)
      }
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} className={className} />
}

// Use dynamic import with ssr:false to prevent hydration errors
export default dynamic(() => Promise.resolve(NetworkBackgroundAnimation), {
  ssr: false
})
