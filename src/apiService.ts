
// import axios from 'axios';

// const API_URL = 'https://run.mocky.io/v3/d167f17c-7577-42fc-84ab-1e5ba05aab81'; 

// export const fetchPipelineData = async () => {
//   try {
//     const response = await axios.get(API_URL);
//     console.log('api called');
//     return response.data;
    
//   } catch (error) {
//     console.error('Error fetching pipeline data:', error);
//     throw error;
//   }
// };

export const pipelineData = [
  {
      "id": "pl_9f7a2c1d",
      "name": "pipeline",
      "entity": [
          {
              "id": "st_3b1f6a29",
              "name": "Prospecting",
              "type": "string",
              "uniqueValues": ["New", "Follow-up", "Low Priority"]
          },
          {
              "id": "st_7c2e5d8f",
              "name": "Qualification",
              "type": "string",
              "uniqueValues": ["High Potential", "Needs Assessment", "Qualified"]
          },
          {
              "id": "num_1a2b3c4d",
              "name": "Deal Size",
              "type": "number",
              "uniqueValues": [10000, 50000, 75000, 100000]
          },
          {
              "id": "dt_2d3c4b5e",
              "name": "Expected Close Date",
              "type": "date",
              "uniqueValues": ["2024-09-30", "2024-10-15", "2024-12-01"]
          },
          {
              "id": "bl_5e6f7a8b",
              "name": "Active",
              "type": "boolean",
              "uniqueValues": [true, false]
          }
      ]
  },
  {
      "id": "rd_a4c3b8d7",
      "name": "rawdata",
      "entity": [
          {
              "id": "dt_5d2b1c8e",
              "name": "Lead List",
              "type": "string",
              "uniqueValues": ["Imported", "Manual Entry", "Third-Party Data"]
          },
          {
              "id": "dt_8a9f4e3b",
              "name": "Customer Feedback",
              "type": "string",
              "uniqueValues": ["Positive", "Negative", "Neutral", "Follow-up Required"]
          },
          {
              "id": "num_7f6d4e9a",
              "name": "Customer Satisfaction Score",
              "type": "number",
              "uniqueValues": [1, 2, 3, 4, 5]
          },
          {
              "id": "dt_4e6a8c9f",
              "name": "Feedback Date",
              "type": "date",
              "uniqueValues": ["2024-07-10", "2024-08-20", "2024-09-01"]
          },
          {
              "id": "bl_9a7d6b3c",
              "name": "Is Verified",
              "type": "boolean",
              "uniqueValues": [true, false]
          }
      ]
  },
  {
      "id": "ld_2f6a7d3e",
      "name": "leads",
      "entity": [
          {
              "id": "ld_3c8b1f5a",
              "name": "John Doe",
              "type": "string",
              "uniqueValues": ["Interested", "Not Interested", "Follow-up", "Closed"]
          },
          {
              "id": "ld_9d7f2b1e",
              "name": "Jane Smith",
              "type": "string",
              "uniqueValues": ["Qualified", "Pending Response", "Closed-Won", "Closed-Lost"]
          },
          {
              "id": "num_3d8e9f1a",
              "name": "Lead Score",
              "type": "number",
              "uniqueValues": [10, 20, 30, 40, 50]
          },
          {
              "id": "dt_5f7a6b2c",
              "name": "Last Contact Date",
              "type": "date",
              "uniqueValues": ["2024-05-12", "2024-06-18", "2024-07-25"]
          },
          {
              "id": "bl_2c3d5f8a",
              "name": "Contacted",
              "type": "boolean",
              "uniqueValues": [true, false]
          }
      ]
  },
  {
      "id": "dl_5b2f9d8a",
      "name": "deals",
      "entity": [
          {
              "id": "dl_7f3a1c2d",
              "name": "Deal with ABC Corp",
              "type": "string",
              "uniqueValues": ["Negotiation", "Closed-Won", "Closed-Lost", "In Progress"]
          },
          {
              "id": "dl_8e9d4f7b",
              "name": "Deal with XYZ Ltd",
              "type": "string",
              "uniqueValues": ["Proposal Sent", "Awaiting Response", "Closed", "On Hold"]
          },
          {
              "id": "num_1e2d3f4b",
              "name": "Deal Value",
              "type": "number",
              "uniqueValues": [25000, 50000, 100000, 150000]
          },
          {
              "id": "dt_3f6a7b4e",
              "name": "Deal Closing Date",
              "type": "date",
              "uniqueValues": ["2024-11-20", "2024-12-15", "2025-01-05"]
          },
          {
              "id": "bl_7e8f9a6d",
              "name": "Deal Closed",
              "type": "boolean",
              "uniqueValues": [true, false]
          }
      ]
  },
  {
      "id": "pr_3c9a7f2b",
      "name": "products",
      "entity": [
          {
              "id": "pr_5d1b8e6f",
              "name": "CRM Software",
              "type": "string",
              "uniqueValues": ["Enterprise", "Small Business", "Freelancer", "Non-Profit"]
          },
          {
              "id": "pr_9f2a3b7d",
              "name": "Analytics Tool",
              "type": "string",
              "uniqueValues": ["Standard", "Professional", "Premium", "Custom"]
          },
          {
              "id": "num_4e3b7a9d",
              "name": "License Cost",
              "type": "number",
              "uniqueValues": [500, 1000, 1500, 2000]
          },
          {
              "id": "dt_2c8d5f7a",
              "name": "Release Date",
              "type": "date",
              "uniqueValues": ["2023-01-10", "2023-05-15", "2023-09-25"]
          },
          {
              "id": "bl_6f4d7a2b",
              "name": "Is Available",
              "type": "boolean",
              "uniqueValues": [true, false]
          }
      ]
  },
  {
      "id": "cp_6e4b3f9a",
      "name": "competitors",
      "entity": [
          {
              "id": "cp_7a1d9f3c",
              "name": "Competitor A",
              "type": "string",
              "uniqueValues": ["Market Leader", "Emerging", "Direct Competitor", "Indirect Competitor"]
          },
          {
              "id": "cp_8f2b6d7e",
              "name": "Competitor B",
              "type": "string",
              "uniqueValues": ["Niche", "Broad Market", "Price Leader", "Innovator"]
          },
          {
              "id": "num_2a3b9e4d",
              "name": "Market Share Percentage",
              "type": "number",
              "uniqueValues": [15, 25, 35, 45]
          },
          {
              "id": "dt_4f7c9b2a",
              "name": "Last Competitive Analysis Date",
              "type": "date",
              "uniqueValues": ["2024-06-01", "2024-09-15", "2024-12-05"]
          },
          {
              "id": "bl_5d6e7c8a",
              "name": "Active Competitor",
              "type": "boolean",
              "uniqueValues": [true, false]
          }
      ]
  }
];
