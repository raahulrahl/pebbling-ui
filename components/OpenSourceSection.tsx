"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { RainbowButton } from "./RainbowButton";

interface GitHubStats {
  stars: number | null;
  contributors: number | null;
}

export const OpenSourceSection = () => {
  const [stats, setStats] = useState<GitHubStats>({ stars: null, contributors: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      setError(null);
      const repoUrl = 'https://api.github.com/repos/Pebbling-ai/pebble';
      const contributorsUrl = 'https://api.github.com/repos/Pebbling-ai/pebble/contributors';
      
      const headers: HeadersInit = {
        Accept: 'application/vnd.github.v3+json',
      };
      if (process.env.NEXT_PUBLIC_GITHUB_PAT) { 
        headers['Authorization'] = `token ${process.env.NEXT_PUBLIC_GITHUB_PAT}`;
      }

      try {
        const [repoRes, contributorsRes] = await Promise.all([
          fetch(repoUrl, { headers }),
          fetch(contributorsUrl, { headers, next: { revalidate: 3600 } }) 
        ]);

        let starsData: number | null = null;
        let contributorsData: number | null = null;
        let fetchError = null;

        if (repoRes.ok) {
          const repoData = await repoRes.json();
          starsData = repoData.stargazers_count ?? null;
        } else {
          fetchError = `Repo fetch failed: ${repoRes.statusText}`;
          console.error("GitHub API Error (Repo):", repoRes.status, repoRes.statusText);
        }

        if (contributorsRes.ok) {
          const contributorsList = await contributorsRes.json();
          contributorsData = Array.isArray(contributorsList) ? contributorsList.length : null;
        } else {
          const contribError = `Contributors fetch failed: ${contributorsRes.statusText}`;
          fetchError = fetchError ? `${fetchError}; ${contribError}` : contribError;
          console.error("GitHub API Error (Contributors):", contributorsRes.status, contributorsRes.statusText);
        }

        if (fetchError) {
            throw new Error(fetchError);
        }

        setStats({ stars: starsData, contributors: contributorsData });
        
      } catch (err: any) {
        console.error("Failed to fetch GitHub stats:", err);
        setError(err.message || 'Failed to load stats');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <section className="w-full py-12 md:py-24 bg-background">
      <div className="container px-4 md:px-6 mx-auto max-w-5xl">
        <motion.div 
          className="flex flex-col items-center justify-center space-y-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl text-center my-2">
            <span className="bg-gradient-to-r from-red-700 via-red-500 to-orange-400 dark:bg-gradient-to-br dark:from-red-700 dark:via-red-600 dark:to-red-500 bg-clip-text text-transparent inline-block font-extrabold">Proudly open-source</span>
          </h2>
          <p className="max-w-[600px] text-muted-foreground md:text-xl">
            Our source code is available on GitHub - feel free to read,
            review, or contribute to it however you want!
          </p>
          
          <RainbowButton 
            onClick={() => window.open("https://github.com/Pebbling-ai/pebble", "_blank")}
            className="mt-4"
          >
            <span className="flex items-center">
              <GitHubLogoIcon className="mr-2 h-5 w-5" />
              Star on GitHub
            </span>
          </RainbowButton>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 w-full">
            <motion.div 
              className="flex flex-col items-center space-y-4 p-6 bg-card text-card-foreground rounded-lg shadow-sm"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex justify-center space-x-2">
                {[1, 2, 3].map((_, i) => (
                  <svg 
                    key={i}
                    xmlns="http://www.w3.org/2000/svg" 
                    width="40" 
                    height="40" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="text-yellow-400"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
              <h3 className="text-2xl font-bold">
                {loading ? 'Loading...' : stats.stars !== null ? `${stats.stars} Stars` : 'N/A Stars'}
              </h3>
              <p className="text-muted-foreground">
                And growing every day
              </p>
            </motion.div>
            
            <motion.div 
              className="flex flex-col items-center space-y-4 p-6 bg-card text-card-foreground rounded-lg shadow-sm"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((_, i) => (
                  <div 
                    key={i} 
                    className="w-10 h-10 rounded-full bg-secondary overflow-hidden"
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="40" 
                      height="40" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      className="text-muted-foreground"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                ))}
              </div>
              <h3 className="text-2xl font-bold">
                {loading ? 'Loading...' : stats.contributors !== null ? `${stats.contributors}+ Contributors` : 'N/A Contributors'}
              </h3>
              <p className="text-muted-foreground">
                Join our growing community
              </p>
            </motion.div>
          </div>
          {error && (
            <p className="text-red-500 text-sm mt-4">Error: {error}</p>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default OpenSourceSection;
