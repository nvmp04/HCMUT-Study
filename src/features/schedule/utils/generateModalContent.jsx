export function getSuccessMessage(){
    return {
        title : "Đặt lịch thành công!",
        renderMessage: (tutor, timeSlot) => (
            <>
                <p className="text-gray-600 mb-6">
                Bạn đã đặt lịch với{" "}
                <strong className="text-gray-900">{tutor?.name}</strong>
                <br />
                Vào lúc:{" "}
                <strong className="text-gray-900">
                    {timeSlot?.day}, {timeSlot?.date} - {timeSlot?.time}
                </strong>
                </p>
            </>
        )
    }
}

export function getExpiredTimeMessage(){
    return{
        title: "Thời gian đã trôi qua!", 
        renderMessage: ()=>(
            <p className="text-gray-600 mb-6">
            Buổi học này đã <strong>quá thời gian bắt đầu</strong>.  
            Vui lòng chọn một khung giờ khác phù hợp hơn.
            </p>
        )
    }
}