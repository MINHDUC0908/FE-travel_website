import { ImageIcon, PlusCircleIcon, UploadIcon } from "lucide-react"
import { useState } from "react";


export const Step2 = ({ images, setImages}) => {
    const [previewImages, setPreviewImages] = useState([]);
    const handleAddImage = () => {
        setImages([...images, ""]);
        setPreviewImages([...previewImages, null]);
    };

    const handleImageChange = (index, e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const newImages = [...images];
            newImages[index] = file;
            setImages(newImages);

            // Tạo preview ảnh
            const reader = new FileReader();
            reader.onload = (e) => {
                const newPreviews = [...previewImages];
                newPreviews[index] = e.target.result;
                setPreviewImages(newPreviews);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = (index) => {
        const newImages = [...images];
        const newPreviews = [...previewImages];
        newImages.splice(index, 1);
        newPreviews.splice(index, 1);
        setImages(newImages);
        setPreviewImages(newPreviews);
    };
    return (
        <>
            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                <p className="text-blue-800 text-sm">
                    Thêm hình ảnh chất lượng cao để thu hút khách hàng. Bạn nên thêm ít nhất 3 hình ảnh để hiển thị đầy đủ về tour.
                </p>
            </div>

            {images.length === 0 ? (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-10 text-center bg-gray-50">
                    <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 mb-4">Chưa có hình ảnh nào được thêm</p>
                    <button
                        type="button"
                        onClick={handleAddImage}
                        className="bg-blue-100 text-blue-700 px-4 py-2 rounded-md hover:bg-blue-200 transition-colors font-medium inline-flex items-center"
                    >
                        <PlusCircleIcon className="w-5 h-5 mr-2" />
                        Thêm Hình Ảnh Đầu Tiên
                    </button>
                </div>
            ) : (
                <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {images.map((image, index) => (
                            <div key={index} className="border rounded-lg overflow-hidden bg-white shadow-sm">
                                {previewImages[index] ? (
                                    <div className="relative bg-gray-100">
                                        <img 
                                            src={previewImages[index]} 
                                            alt={`Preview ${index}`} 
                                            className="w-full h-full object-cover"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveImage(index)}
                                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </div>
                                ) : (
                                    <div className="h-96 bg-gray-100 flex items-center justify-center">
                                        <UploadIcon className="w-10 h-10 text-gray-300" />
                                    </div>
                                )}
                                <div className="p-3">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleImageChange(index, e)}
                                        className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 w-full"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="text-center pt-2">
                        <button
                            type="button"
                            onClick={handleAddImage}
                            className="inline-flex items-center bg-blue-100 text-blue-700 px-4 py-2 rounded-md hover:bg-blue-200 transition-colors font-medium"
                        >
                            <PlusCircleIcon className="w-5 h-5 mr-2" />
                            Thêm Hình Ảnh Tiếp Theo
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}