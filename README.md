# Text Processing POC

A simple serverless text-processing pipeline using AWS CDK.

## 📦 Setup

```bash
npm install
```

## Deployment

```bash
npm run deploy
```

## Test API
```bash
curl -X POST \
  https://<your-api-id>.execute-api.<region>.amazonaws.com/prod/upload \
  -H "Content-Type: application/json" \
  -d '{"fileContent": "line1\nline2\nline3"}'
```

### Monitoring

---

### ✅ Notes & Considerations

- Replace `<your-api-id>` and region in the cURL with your actual values from CloudFormation/CDK output.
- Ensure your MongoDB Atlas allows connections from your Lambda's IP range or VPC if used.
- Optionally add API key or usage plans for production use.
