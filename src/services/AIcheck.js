const SYSTEM_DEFINE = `
    Bạn là AI kiểm duyệt của ĐH Bách Khoa. 
    NHIỆM VỤ: Kiểm tra nội dung học thuật hoặc lý do giao tiếp.
    QUY TẮC: Chỉ trả về JSON nguyên bản, không giải thích.
    FORMAT: {"error": boolean, "message": "string", "ban": boolean}
`;

async function askAI(taskPrompt, content) {
    try {
        const fullPrompt = `${SYSTEM_DEFINE}\nNhiệm vụ: ${taskPrompt}\nNội dung cần kiểm tra: "${content}"`;
        const res = await puter.ai.chat(fullPrompt);
        const rawContent = res.message.content;
        
        const jsonMatch = rawContent.match(/\{.*\}/s);
        if (!jsonMatch) throw new Error("AI không trả về đúng định dạng JSON");
        
        const result = JSON.parse(jsonMatch[0]);
        return {
            error: String(result.error) === 'true',
            message: result.message || "",
            ban: String(result.ban) === 'true'
        };
    } catch (err) {
        console.error("AI Check Error:", err);
        return { error: false, message: "", ban: false };
    }
}

export const checkTitleRequest = (text) => 
    askAI("Kiểm tra nội dung môn học. Nếu vô nghĩa hoặc không liên quan học tập thì error:true. Nếu xúc phạm thì ban:true.", text);

export const checkTutorReason = (text) => 
    askAI("Kiểm tra lý do hủy/từ chối. Nếu thiếu tôn trọng/vô nghĩa thì error:true. Nếu xúc phạm thì ban:true.", text);