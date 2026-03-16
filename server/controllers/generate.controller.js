import UserModel from "../modals/user.models.js"
import NotesModel from "../modals/notes.model.js"
import { buildPrompt } from "../utils/promptBuilder.js";
import {generateGeminiResponse} from "../services/gemini.services.js"
export const generateNotes = async (req, resp) => {
    try {
        const {
            topic,
            classLevel,
            examType,
            revisionMode=false,
            includeDiagram = false,
            includeChart = false
        } = req.body;
        if (!topic) {
            return resp.status(400).json({message:"Topic is required."})
        }
        const user = await UserModel.findById(req.userId)
        if (!user) {
            return resp.status(400).json({ message: "User not found" });
        }
        if (user.credits < 10) {
            user.isCreditAvailable = false;
            await user.save();
            return resp.status(403).json({ message: "Insufficient credits" });
        }
        const prompt = buildPrompt({
            topic,
            classLevel,
            examType,
            revisionMode,
            includeDiagram,
            includeChart
        })
        const aiResponse = await generateGeminiResponse(prompt)
        const notes = await NotesModel.create({
            user: user._id,
            topic,
            classLevel,
            examType,
            revisionMode,
            includeDiagram,
            includeChart,
            content:aiResponse
            
        })
        user.credits -= 10;
        if (user.credits <= 0) user.isCreditAvailable = false;
        if (!Array.isArray(user.notes)) {
            user.notes = [];
        }
        user.notes.push(notes._id)
        await user.save();

        return resp.status(200).json({
            data: aiResponse,
            notesId: notes._id,
            creditsLeft:user.credits
        })

    } catch (error) {
        console.error(error);
        resp.status(500).json({
            error:"AI generation failed", message:error.message
        })
    }
}