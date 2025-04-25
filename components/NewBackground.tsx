"use client"

import { useRef, useEffect } from "react"

export default function NetworkBackgroundAnimation({
  config = {
    numAgents: 40,
    connectionDistance: 180,
    agentTypes: ["primary", "secondary", "tertiary"],
    messageFrequency: 0.02,
    messageSpeed: 2,
    agentSpeed: 0.4,
  },
  className = "absolute inset-0 w-full h-full z-0"
}) {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Create agents representing AI entities
    const agents = []

    class Message {
      constructor(source, target, type) {
        this.source = source
        this.target = target
        this.progress = 0
        this.speed = config.messageSpeed * (0.8 + Math.random() * 0.4)
        this.size = 2 + Math.random() * 2
        this.type = type || "data"
        this.color = this.getColor()
        this.completed = false
        this.pathPoints = this.generatePath()
        this.currentPoint = 0
        this.x = source.x
        this.y = source.y
      }

      getColor() {
        switch (this.type) {
          case "request":
            return "rgba(100, 255, 218, 0.9)"
          case "response":
            return "rgba(118, 228, 247, 0.9)"
          case "broadcast":
            return "rgba(255, 214, 118, 0.9)"
          default:
            return "rgba(255, 255, 255, 0.8)"
        }
      }

      generatePath() {
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

      update() {
        this.currentPoint += this.speed

        if (this.currentPoint >= this.pathPoints.length - 1) {
          this.completed = true
          // Create a response message with 70% probability
          if (this.type === "request" && Math.random() < 0.7) {
            agents.push(new Message(this.target, this.source, "response"))
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

      draw() {
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
            ctx.fillStyle = this.color.replace(")", `, ${0.7 * (1 - i / trailLength)})`)
            ctx.fill()
          }
        }
      }
    }

    class Agent {
      constructor(type = "primary") {
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
            return `rgba(100, 255, 218, ${0.7 + Math.random() * 0.3})`
          case "secondary":
            return `rgba(118, 228, 247, ${0.6 + Math.random() * 0.3})`
          case "tertiary":
            return `rgba(255, 255, 255, ${0.5 + Math.random() * 0.3})`
          default:
            return "rgba(255, 255, 255, 0.7)"
        }
      }

      update(currentTime) {
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
          if (this.pulseRadius > config.connectionDistance) {
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
              agents.push(new Message(this, targetAgent, "request"))
            }
          }
        }

        // Animate data points
        this.dataPoints.forEach((point) => {
          point.height = Math.max(0.3, Math.min(1, point.height + (Math.random() - 0.5) * 0.05))
        })
      }

      draw() {
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
          const colorMatch = this.color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/)
          if (colorMatch) {
            ctx.fillStyle = `rgba(${colorMatch[1]}, ${colorMatch[2]}, ${colorMatch[3]}, 0.2)`
          } else {
            ctx.fillStyle = "rgba(100, 255, 218, 0.2)"
          }
          ctx.fill()
        }

        // Draw pulse effect
        if (this.isPulsing) {
          ctx.beginPath()
          ctx.arc(this.x, this.y, this.pulseRadius, 0, Math.PI * 2)

          // Extract the base color and create new rgba with modified alpha
          const colorMatch = this.color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/)
          if (colorMatch) {
            ctx.strokeStyle = `rgba(${colorMatch[1]}, ${colorMatch[2]}, ${colorMatch[3]}, 0.3)`
          } else {
            ctx.strokeStyle = "rgba(100, 255, 218, 0.3)"
          }
          ctx.lineWidth = 1
          ctx.stroke()
        }

        // Draw connections
        this.connections.forEach((agent) => {
          const distance = Math.sqrt(Math.pow(this.x - agent.x, 2) + Math.pow(this.y - agent.y, 2))
          if (distance < config.connectionDistance) {
            ctx.beginPath()
            ctx.moveTo(this.x, this.y)
            ctx.lineTo(agent.x, agent.y)

            // Create gradient for connection with proper color format
            const gradient = ctx.createLinearGradient(this.x, this.y, agent.x, agent.y)

            // Extract the base color and create new rgba with modified alpha
            const sourceColorMatch = this.color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/)
            const targetColorMatch = agent.color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/)

            if (sourceColorMatch && targetColorMatch) {
              const sourceRgba = `rgba(${sourceColorMatch[1]}, ${sourceColorMatch[2]}, ${sourceColorMatch[3]}, 0.2)`
              const targetRgba = `rgba(${targetColorMatch[1]}, ${targetColorMatch[2]}, ${targetColorMatch[3]}, 0.2)`

              gradient.addColorStop(0, sourceRgba)
              gradient.addColorStop(1, targetRgba)
            } else {
              // Fallback if color parsing fails
              gradient.addColorStop(0, "rgba(100, 255, 218, 0.2)")
              gradient.addColorStop(1, "rgba(118, 228, 247, 0.2)")
            }

            ctx.strokeStyle = gradient
            ctx.lineWidth = 0.5 * (1 - distance / config.connectionDistance)
            ctx.stroke()
          }
        })
      }
    }

    // Initialize agents
    for (let i = 0; i < config.numAgents; i++) {
      const typeIndex = Math.floor(Math.random() * config.agentTypes.length)
      agents.push(new Agent(config.agentTypes[typeIndex]))
    }

    // Create connections between agents
    agents.forEach((agent) => {
      agents.forEach((otherAgent) => {
        if (agent !== otherAgent) {
          const distance = Math.sqrt(Math.pow(agent.x - otherAgent.x, 2) + Math.pow(agent.y - otherAgent.y, 2))
          if (distance < config.connectionDistance) {
            agent.connections.push(otherAgent)
          }
        }
      })
    })

    // Create some initial messages
    for (let i = 0; i < 5; i++) {
      const sourceIndex = Math.floor(Math.random() * agents.length)
      const source = agents[sourceIndex]

      if (source.connections.length > 0) {
        const targetIndex = Math.floor(Math.random() * source.connections.length)
        const target = source.connections[targetIndex]
        agents.push(new Message(source, target, "request"))
      }
    }

    // Animation loop
    let lastTime = 0
    const animate = (currentTime) => {
      const deltaTime = currentTime - lastTime
      lastTime = currentTime

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw background gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      gradient.addColorStop(0, "#0F172A")
      gradient.addColorStop(1, "#1E293B")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Add some noise/stars to the background
      for (let i = 0; i < 50; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        const radius = Math.random() * 1
        ctx.beginPath()
        ctx.arc(x, y, radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.2})`
        ctx.fill()
      }

      // Update and draw agents
      agents.forEach((agent) => {
        if (agent instanceof Agent) {
          agent.update(currentTime)
          agent.draw()
        }
      })

      // Update and draw messages
      for (let i = agents.length - 1; i >= 0; i--) {
        if (agents[i] instanceof Message) {
          agents[i].update()
          agents[i].draw()

          if (agents[i].completed) {
            agents.splice(i, 1)
          }
        }
      }

      // Occasionally create new connections as agents move
      if (Math.random() < 0.01) {
        agents.forEach((agent) => {
          if (agent instanceof Agent) {
            agent.connections = []
            agents.forEach((otherAgent) => {
              if (otherAgent instanceof Agent && agent !== otherAgent) {
                const distance = Math.sqrt(Math.pow(agent.x - otherAgent.x, 2) + Math.pow(agent.y - otherAgent.y, 2))
                if (distance < config.connectionDistance) {
                  agent.connections.push(otherAgent)
                }
              }
            })
          }
        })
      }

      // Occasionally broadcast message from a random primary agent
      if (Math.random() < 0.002) {
        const primaryAgents = agents.filter((agent) => agent instanceof Agent && agent.type === "primary")
        if (primaryAgents.length > 0) {
          const broadcaster = primaryAgents[Math.floor(Math.random() * primaryAgents.length)]
          broadcaster.isPulsing = true

          // Create broadcast messages to all connected agents
          broadcaster.connections.forEach((target) => {
            if (target instanceof Agent) {
              agents.push(new Message(broadcaster, target, "broadcast"))
            }
          })
        }
      }

      requestAnimationFrame(animate)
    }

    animate(0)

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [config])

  return <canvas ref={canvasRef} className={className} />
}
