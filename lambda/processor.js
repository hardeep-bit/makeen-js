const mongoose = require('mongoose');

const lineSchema = new mongoose.Schema({
    lineNumber: Number,
    content: String
});

const Line = mongoose.model('Line', lineSchema);

exports.handler = async (event) => {
    const body = JSON.parse(event.body);
    const { fileContent } = body;

    if (!fileContent) {
        return { statusCode: 400, body: JSON.stringify({ error: 'Missing fileContent' }) };
    }

    const lines = fileContent.split('\n').map(line => line.trim()).filter(Boolean);
    const processed = lines.map((line, index) => ({ lineNumber: index + 1, content: line }));

    try {
        await mongoose.connect(process.env.MONGODB_URI);
        await Line.insertMany(processed);
    } catch (err) {
        return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
    } finally {
        await mongoose.disconnect();
    }

    return {
        statusCode: 200,
        body: JSON.stringify({ message: 'File processed and stored successfully.' })
    };
};
