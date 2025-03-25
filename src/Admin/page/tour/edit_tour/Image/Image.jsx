import { useState } from "react";
import { MdClose, MdDelete, MdWarning } from "react-icons/md";
import { motion } from "framer-motion";
import { src } from "../../../../../../Api";
import { useImage } from "../../../../Context/ImageContext";
import { Im500Px } from "react-icons/im";
import { X } from "lucide-react";
import { toast } from "react-toastify";

function ImageModal({ images, setShowImageDialog, setTour, tour }) {
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
    const [showStoreImage, setShowStoreImage] = useState(false)
    const [id_delete, setId_delete] = useState(null)

    // Hàm xử lý xóa hình ảnh
    const { deleteImage, handleImage } = useImage();
    const [Delete, setDelete] = useState(false);
    const handleShowModal = (id) => {
        setId_delete(id);
        setDelete(true)
    }
    const handleDelete = () => {
        if (Delete)
        {
            deleteImage(id_delete);
            setDelete(false);
            setId_delete(null);
            // Cập nhật lại dữ liệu tour với các ảnh còn lại
            setTour((prev) => ({
                ...prev,
                // Lọc bỏ ảnh đã bị xóa (dựa trên `id_delete`)
                Images: prev.Images?.filter((image) => image.id !== id_delete),
            }));
        }
    }
    console.log(showStoreImage)
    const ModalDelete = () => {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
                <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm transition-opacity" onClick={() => setDelete(false)}></div>
                
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="relative bg-white w-full max-w-md rounded-xl shadow-2xl mx-4"
                >
                    <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
                        <div className="bg-red-100 p-4 rounded-full border-4 border-white shadow-lg">
                            <MdWarning className="text-red-500 text-4xl" />
                        </div>
                    </div>
                    <button 
                        className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
                        onClick={() => setDelete(false)}
                    >
                        <MdClose className="text-xl" />
                    </button>
                    
                    <div className="pt-10 pb-6 px-6">
                        <div className="text-center mb-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-2">
                                Xóa hình ảnh
                            </h3>
                            <p className="text-gray-500">
                                Bạn có chắc chắn muốn xóa hình ảnh này khỏi hệ thống?
                            </p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg mb-6 flex items-center border border-gray-100">
                            <div className="bg-red-50 p-2 rounded-lg mr-3">
                                <Im500Px className="text-red-500 text-xl" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">
                                    Hình ảnh sẽ bị xóa vĩnh viễn và bạn sẽ không thể khôi phục lại nó sau khi xóa.
                                </p>
                            </div>
                        </div>
                        <div className="flex justify-between gap-4">
                            <button
                                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                                onClick={() => setDelete(false)}
                            >
                                <MdClose className="text-lg" />
                                <span>Hủy bỏ</span>
                            </button>
                            <button
                                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                                onClick={handleDelete}
                            >
                                <MdDelete className="text-lg" />
                                <span>Xác nhận xóa</span>
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        )
    }
    const ModalStoreImage = () => {
        const [selectedImage, setSelectedImage] = useState(null);
        const [file, setFile] = useState(null);
        const handleImageChange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const imageUrl = URL.createObjectURL(file);
                setSelectedImage(imageUrl);
                setFile(file)
            }
        };
        const storeImage = async () => {
            try {
                if (!file)
                {
                    return toast.error("Lỗi khi thêm hình ảnh")
                }
                const formdata = new FormData();
                formdata.append("tour_id", tour.id)
                formdata.append("image_url", file)
                const newImage = await handleImage(formdata); // ✅ Lấy dữ liệu ảnh mới
                if (newImage) {
                    setTour((prev) => ({
                        ...prev,
                        Images: [...prev.Images, newImage]
                    }));
                }
                setShowStoreImage(false)
            } catch (error) {
                
            }
        }
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
                <div 
                    className="fixed inset-0 bg-gradient-to-b from-black/70 to-gray-900/70 backdrop-blur-md transition-opacity duration-300" 
                ></div>
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="relative bg-white dark:bg-gray-800 w-full max-w-lg rounded-2xl shadow-xl mx-4 p-6"
                >
                    <button 
                        onClick={() => setShowStoreImage(false)}
                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-100 transition-colors"
                    >
                        <X size={24} />
                    </button>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-6">
                        Thêm hình ảnh
                    </h2>
                    <div className="flex flex-col items-center gap-5">
                        {selectedImage && (
                            <div className="relative w-full overflow-hidden rounded-xl shadow-lg">
                                <img 
                                    src={selectedImage} 
                                    alt="Preview" 
                                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                />
                            </div>
                        )}
                        <label className="cursor-pointer bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-full font-medium shadow-md hover:from-blue-600 hover:to-blue-700 transition-all duration-300">
                            Chọn hình ảnh
                            <input 
                                type="file" 
                                accept="image/*" 
                                className="hidden"
                                onChange={handleImageChange} 
                            />
                        </label>
                    </div>
                    <div className="mt-8 flex justify-end gap-3">
                        <button 
                            onClick={() => setShowStoreImage(false)}
                            className="px-5 py-2.5 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-full font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300"
                        >
                            Hủy
                        </button>
                        <button 
                            onClick={storeImage}
                            className="px-5 py-2.5 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full font-medium shadow-md hover:from-green-600 hover:to-green-700 transition-all duration-300"
                        >
                            Xác nhận
                        </button>
                    </div>
                </motion.div>
            </div>
        );
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
                    onClick={() => setShowImageDialog(false)}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                >
                    <MdClose className="w-8 h-8" />
                </button>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    Hình ảnh tour
                </h2>
                {images && images.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        {images.map((image) => (
                            <motion.div
                                key={image.id}
                                className="relative group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                                whileHover={{ scale: 1.03 }}
                            >
                                <img
                                    src={src + image.image_url}
                                    alt={`Tour image ${image.id}`}
                                    className="w-full h-full object-cover rounded-lg"
                                />
                                <button
                                    onClick={() => handleShowModal(image.id)}
                                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                >
                                    <MdClose className="w-5 h-5" />
                                </button>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-10">
                        <MdWarning className="w-12 h-12 text-yellow-500 mb-2" />
                        <p className="text-gray-500">Không có hình ảnh để hiển thị</p>
                    </div>
                )}
                <div className="flex justify-center mt-6" 
                    onClick={() => {
                        setShowStoreImage(true);
                    }}
                    
                >
                    <button className="group relative flex items-center gap-2 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-rose-500 text-white font-medium px-4 py-2 rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 hover:shadow-2xl hover:shadow-purple-500/30 hover:scale-105">
                        <span className="z-10 relative">Thêm hình ảnh</span>
                        <div className="absolute inset-0 w-full h-full">
                            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cyan-300 via-white to-fuchsia-300 opacity-0 group-hover:opacity-100 group-hover:animate-pulse"></div>
                            <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-fuchsia-300 via-white to-cyan-300 opacity-0 group-hover:opacity-100 group-hover:animate-pulse"></div>
                            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-cyan-300 via-white to-fuchsia-300 opacity-0 group-hover:opacity-100 group-hover:animate-pulse"></div>
                            <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-fuchsia-300 via-white to-cyan-300 opacity-0 group-hover:opacity-100 group-hover:animate-pulse"></div>
                        </div>
                    </button>
                </div>
            </motion.div>
            {Delete && <ModalDelete/>}
            {showStoreImage && <ModalStoreImage/>}
        </motion.div>
    );
}

export default ImageModal;