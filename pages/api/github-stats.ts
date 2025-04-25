import { NextApiRequest, NextApiResponse } from 'next';

// Define the structure for the response data
interface GitHubStats {
  stars: number | null;
  contributors: number | null;
}

// Define the structure for the API error response
interface ErrorResponse {
  error: string;
  message?: string; 
}

// Define the repository owner and name
const GITHUB_OWNER = 'Pebbling-ai';
const GITHUB_REPO = 'pebble';
const GITHUB_REPO_URL = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}`;
const GITHUB_CONTRIBUTORS_URL = `${GITHUB_REPO_URL}/contributors?per_page=1`; // Only need the count, so fetch 1 page

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GitHubStats | ErrorResponse>
) {
  // Use Authorization header if a GitHub token is available in environment variables
  // This increases rate limits and allows access to private repo stats if needed.
  const headers: HeadersInit = {
    Accept: 'application/vnd.github.v3+json',
  };
  if (process.env.GITHUB_PAT) {
    headers['Authorization'] = `token ${process.env.GITHUB_PAT}`;
  }

  try {
    // Fetch repository details (for stars)
    const repoRes = await fetch(GITHUB_REPO_URL, { headers });
    if (!repoRes.ok) {
      console.error(`GitHub API Error (Repo): ${repoRes.status} ${repoRes.statusText}`);
      const errorBody = await repoRes.text();
      console.error(`Error Body: ${errorBody}`);
      throw new Error(`Failed to fetch repo data: ${repoRes.statusText}`);
    }
    const repoData = await repoRes.json();
    const stars = repoData.stargazers_count ?? null;

    // Fetch contributors (we only need the count, GitHub API provides total count in headers)
    // Fetching just one contributor (`per_page=1`) is efficient.
    // The total count is often in the 'Link' header for pagination.
    let contributors: number | null = null;
    const contributorsRes = await fetch(GITHUB_CONTRIBUTORS_URL, { headers });

    if (!contributorsRes.ok) {
      console.error(`GitHub API Error (Contributors): ${contributorsRes.status} ${contributorsRes.statusText}`);
      const errorBody = await contributorsRes.text();
      console.error(`Error Body: ${errorBody}`);
      // Don't throw an error here, maybe stars succeeded. Log and continue.
    } else {
      const linkHeader = contributorsRes.headers.get('Link');
      if (linkHeader) {
        const match = linkHeader.match(/<.*?page=(\d+)>; rel="last"/);
        if (match && match[1]) {
           // If 'last' link exists, that page number is the total count (for per_page=1)
           // Actually, this isn't reliable for total count. A better approach is needed if > 100 contributors.
           // For simplicity, let's assume less than 100 or just count the first page if Link header is complex.
           // A more robust solution might involve fetching all contributors or using GraphQL.
           // Let's count the length of the response for now if header parsing fails.
          try {
            const contributorsList = await contributorsRes.json();
            contributors = contributorsList.length; // Fallback: count contributors on the first page
            // Attempt to parse the 'last' page number more reliably
            const links = linkHeader.split(',');
            const lastLink = links.find(link => link.includes('rel="last"'));
            if (lastLink) {
              const lastPageMatch = lastLink.match(/page=(\d+)/);
              if (lastPageMatch && lastPageMatch[1]) {
                // If per_page=1, last page *should* be count, but let's use a safer approach
                // Let's make another call without per_page to get the real count
                const allContributorsRes = await fetch(`${GITHUB_REPO_URL}/contributors`, { headers });
                if (allContributorsRes.ok) {
                  const allContributorsData = await allContributorsRes.json();
                  contributors = allContributorsData.length; 
                } else {
                   console.warn("Could not accurately fetch total contributors count.")
                }
              }
            }
            
          } catch (parseError) {
             console.error("Error parsing contributors response:", parseError);
          }
        }
      } else {
        // If no Link header, likely only one page of contributors
        try {
            const contributorsList = await contributorsRes.json();
            contributors = contributorsList.length;
        } catch (parseError) {
             console.error("Error parsing single page contributors response:", parseError);
        }
      }
      // Fallback if Link header logic failed entirely
      if (contributors === null) {
          const fallbackContributorsRes = await fetch(`${GITHUB_REPO_URL}/contributors`, { headers });
          if (fallbackContributorsRes.ok) {
              const fallbackData = await fallbackContributorsRes.json();
              contributors = fallbackData.length;
          }
      }
    }

    res.status(200).json({ stars, contributors });

  } catch (error: any) {
    console.error('Error fetching GitHub stats:', error);
    res.status(500).json({ 
        error: 'Failed to fetch GitHub stats', 
        message: error.message || 'Internal Server Error' 
    });
  }
}
