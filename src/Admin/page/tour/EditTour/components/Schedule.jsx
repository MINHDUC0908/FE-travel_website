import { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import { motion } from "framer-motion";
import axios from "axios";
import { api } from "../../../../../../Api";
import { toast } from "react-toastify";
import { CKEditor } from "ckeditor4-react";

function Schedule({ schedule, setShowModal, setTour }) {
    const modalVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
        exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
    };

    const backdropVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.3 } },
        exit: { opacity: 0, transition: { duration: 0.2 } },
    };
    
    const [activities, setActivities] = useState(schedule.activities || "");

    useEffect(() => {
        setActivities(schedule.activities || "");
    }, [schedule]);

    // Hàm xử lý khi người dùng gửi form
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put(
                api + `/admin/schedule/update/${schedule.id}`, 
                { activities },
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
                }
            );
    
            if (res.data.success) {
                toast.success("Cập nhật lịch trình thành công");
                setShowModal(false);
    
                // Cập nhật state với schedule mới
                setTour((prev) => ({
                    ...prev,
                    Schedules: prev.Schedules?.map((item) => 
                        item.id === schedule.id ? { ...item, activities } : item
                    )
                }));
            }
        } catch (error) {
            toast.error("Đã xảy ra lỗi khi cập nhật lịch trình");
        }
    };
    

    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            <motion.div
                className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl p-6 max-h-[90vh] overflow-y-auto"
                variants={modalVariants}
            >
                <button
                    onClick={() => setShowModal(false)}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                >
                    <MdClose className="w-8 h-8" />
                </button>
                <h2 className="text-2xl font-semibold mb-4">Chỉnh sửa Mô tả Lịch trình</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <h3 className="font-bold text-gray-700">Ngày {schedule.day_number}</h3>
                        <CKEditor
                            initData={activities}
                            onChange={(event) => {
                                const data = event.editor.getData();
                                setActivities(data);
                            }}
                        />
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={() => setShowModal(false)}
                            className="bg-gray-200 text-gray-700 hover:bg-gray-300 px-6 py-2 rounded-md transition-colors"
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white hover:bg-blue-600 px-6 py-2 rounded-md transition-colors"
                        >
                            Lưu
                        </button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
}

export default Schedule;
