const define = `
        Bạn là AI của hệ thống giáo dục trường Đại học Bách khoa. 
        Chỉ trả về **duy nhất** một đối tượng JSON:
        {error:'true hoặc false (string)', message:'custom', ban: 'true hoặc false (string)'}`

export async function checkTitleRequest(text){
    const prompt = `
        ${define} 
        Nhiệm vụ: kiểm tra nội dung môn học (lĩnh vực, chủ đề, nội dung mong muốn được học). 
        Phân loại mức độ phù hợp của nội dung theo quy định học thuật.
        Quy tắc:
        1. Nếu nội dung mang tính học thuật, đúng chủ đề học tập trả về error:'false', message:'', ban: 'false'
        2. Nếu nội dung vô nghĩa (gõ sai, ký tự linh tinh) hoặc không liên quan học tập trả về 
        error: 'true', message:'Nội dung không hợp lệ hoặc không rõ ràng. Vui lòng nhập chủ đề học tập cụ thể và phù hợp với môi trường giáo dục.', ban: 'false'
        3. Nếu nội dung chứa ngôn từ phản cảm, xúc phạm hoặc vi phạm đạo đức trả về 
        message:'Hệ thống ghi nhận hành vi vi phạm nghiêm trọng đạo đức. Nội dung xúc phạm đã được chuyển đến Phòng Đào Tạo, tài khoản sẽ bị khóa để xử lý.', ban: 'true'
        Đây là nội dung được yêu cầu: "${text}". 
    `;
    const res = await puter.ai.chat(prompt);
    const replyJSON = res.message.content;
    const reply = JSON.parse(replyJSON);
    return reply;
}

export async function checkTutorReason(text) {
  const prompt = `
   ${define}
   Nhiệm vụ: kiểm tra lý do hủy lịch hoặc từ chối lịch.
   Chỉ trả về **duy nhất** một đối tượng JSON:
   {error:'true hoặc false (string)', message:'custom', ban:'true hoặc false (string)'}

   Quy tắc:

   1. Nếu lý do hợp lý, liên quan trực tiếp đến việc hủy hoặc từ chối buổi học, thể hiện sự tôn trọng và chuyên nghiệp → 
      error:'false', message:'', ban:'false'

   2. Nếu lý do **không liên quan hủy/từ chối buổi học**, quá ngắn, vô nghĩa, gõ ký tự linh tinh, hoặc thiếu tôn trọng → 
      error:'true', message:'Lý do không hợp lệ, không liên quan đến việc hủy/từ chối buổi học. Vui lòng ghi rõ lý do phù hợp với môi trường giáo dục.', ban:'false'

   3. Nếu lý do chứa **từ ngữ xúc phạm, thù ghét, hoặc gây tổn hại đạo đức** → 
      error:'true', message:'Hệ thống ghi nhận hành vi vi phạm nghiêm trọng đạo đức. Nội dung xúc phạm đã được chuyển đến Phòng Đào Tạo, tài khoản sẽ bị khóa để xử lý.', ban:'true'

   Đây là lý do được gửi: "${text}".

  `;
  const res = await puter.ai.chat(prompt);
  const replyJSON = res.message.content;
  const reply = JSON.parse(replyJSON);
  return reply;
}
