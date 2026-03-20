# Deployment Guide: Rootly API Integration

This dashboard integrates with the Rootly API to provide live data for incidents and SLOs.

## How to Set Up Rootly API Key

1.  **Generate a Rootly API Token**:
    - Log in to your Rootly account.
    - Go to **Organization dropdown** > **Organization Settings** > **API Keys**.
    - Click **Create API Key** and give it a descriptive name (e.g., `SRE-Dashboard`).
    - Copy the generated token immediately.

2.  **Configure Environment Variables**:
    - For **Local Development**:
        - Create a `.env.local` file in the project root.
        - Add the following line:
          ```
          ROOTLY_API_KEY=YOUR-TOKEN-HERE
          ```
    - For **Production (Vercel)**:
        - Go to your project settings on Vercel.
        - Navigate to **Environment Variables**.
        - Add a new variable `ROOTLY_API_KEY` with your token as the value.

3.  **Restart the Application**:
    - After setting the environment variable, restart your development server or trigger a new deployment on Vercel.

## Deployment via Docker

1. **Build the image**:
   ```bash
   docker build -t rootly-dashboard .
   ```

2. **Run the container**:
   ```bash
   docker run -p 3000:3000 -e ROOTLY_API_KEY=your_api_key_here rootly-dashboard
   ```

### Using Docker Compose

1. **Create a `.env` file** (or ensure `ROOTLY_API_KEY` is exported):
   ```bash
   ROOTLY_API_KEY=your_api_key_here
   ```

2. **Run with compose**:
   ```bash
   docker-compose up -d
   ```

## Verifying the Integration

Once the API key is set (via environment variables or `.env.local`), the dashboard will automatically switch from mock data to live data from your Rootly instance. You can verify this in the **Incident Log** section at the bottom of the page, or by checking the "Source: Rootly LIVE" badge in the header.
