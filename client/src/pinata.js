import axios from "axios";
const JWT = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJhMDJkYjdhZi03NDBlLTRkZTEtYWEzYS02YjU1NzQ2NWQ3ZTAiLCJlbWFpbCI6InNvcnB3amRhZmhAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6ImNhMzgxNmQ4NDlkYzdkZWZjZWRmIiwic2NvcGVkS2V5U2VjcmV0IjoiMmY4YWNlNzRiZTM4NDQ1NGUxZDQ5MjYxNGZmNWMyNDYyNDEwOGY5MzZiNzcwOWI1MDkxZDllYTA1M2M3NmNkYyIsImlhdCI6MTY2MDc5MjU3Nn0.JiG4GbHOhLkns9z3OyLIzLEA3ZRKjsRmQHsNFfH7IhU`;

export const pinFileToIPFS = async (file) => {
  const data = new FormData();
  data.append("file", file);
  data.append("pinataOptions", '{"cidVersion": 1}');
  data.append(
    "pinataMetadata",
    '{"name": "MyFile", "keyvalues": {"company": "Pinata"}}'
  );

  const config = {
    method: "post",
    url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
    headers: {
      Authorization: `Bearer ${JWT}`,
    },
    data: data,
  };

  const res = await axios(config);

  return res.data;
};

export const pinJSONToIPFS = async (json) => {
  const data = JSON.stringify({
    pinataOptions: {
      cidVersion: 1,
    },
    pinataMetadata: {
      name: "testing",
      keyvalues: {
        customKey: "customValue",
        customKey2: "customValue2",
      },
    },
    pinataContent: json,
  });

  const config = {
    method: "post",
    url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${JWT}`,
    },
    data: data,
  };

  const res = await axios(config);

  return res.data;
};
