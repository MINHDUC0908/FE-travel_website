import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { api, formatDate, formatPrice, src } from '../../../../Api';
import { Link } from 'react-router-dom';
import { Trash, Edit, Plus, Loader2, Image, X, Eye } from 'lucide-react';
import { FaShoppingBag } from 'react-icons/fa';
import { useTour } from '../../Context/TourContext';

function Tour({ setCurrentTitle }) {
    const [error, setError] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const { destroy, tours, loading } = useTour()

    useEffect(() => {
        window.scroll(0, 0)
        setCurrentTitle("Danh sách Tour")
    }, [setCurrentTitle]);

    const openImagePreview = (imageUrl, tourName) => {
        setPreviewImage({
            url: `${src}${imageUrl}`,
            name: tourName
        });
    };

    const closeImagePreview = () => {
        setPreviewImage(null);
    };

    if (loading) return (
        <div className="flex flex-col items-center justify-center min-h-[800px] bg-white rounded-2xl shadow-lg">
            <div className="relative">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
                <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
                    <FaShoppingBag className="text-blue-500 text-lg" />
                </div>
            </div>
        </div>
    );
    
    if (error) return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-lg font-medium text-red-500 bg-red-50 px-8 py-4 rounded-xl border border-red-100 shadow-sm">
                {error}
            </div>
        </div>
    );
    return (
        <div className="">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <h2 className="text-3xl font-bold text-gray-800 bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
                    Danh sách Tour
                </h2>
                <Link to={"/admin/tour/create"}>
                    <button className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white px-6 py-3 rounded-xl font-medium
                        hover:from-indigo-700 hover:to-blue-600 transform hover:scale-105 transition-all duration-200 shadow-md
                        flex items-center gap-2 w-full">
                        <Plus className="w-5 h-5" />
                        Thêm Tour Mới
                    </button>
                </Link>
            </div>

            <div className="mb-6 bg-gradient-to-r from-indigo-50 to-blue-50 p-4 rounded-xl shadow-sm border border-indigo-100">
                <p className="text-gray-700">
                    Tổng cộng: <span className="font-bold text-indigo-600">{tours.length} Tour</span>
                </p>
            </div>
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    <table className="w-full table-fixed border-collapse">
                        <thead className="bg-gray-50 sticky top-0">
                            <tr>
                                <th className="w-2/12 px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Tour</th>
                                <th className="w-2/12 px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Destination</th>
                                <th className="w-1/12 px-4 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">Spots</th>
                                <th className="w-1/12 px-4 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">Adult Price</th>
                                <th className="w-1/12 px-4 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">Child Price</th>
                                <th className="w-2/12 px-4 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">Dates</th>
                                <th className="w-2/12 px-4 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">Gallery</th>
                                <th className="w-1/12 px-4 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {tours.length > 0 ? (
                                tours.map((tour) => (
                                <tr 
                                    key={tour.id} 
                                    className="hover:bg-gray-50 transition-all duration-200 ease-in-out"
                                >
                                    <td className="px-4 py-4">
                                        <div className="text-sm font-medium text-gray-800 break-words" title={tour.tour_name}>
                                            {tour.tour_name}
                                        </div>
                                    </td>
                                    <td className="px-4 py-4">
                                        <div className="text-sm text-gray-600 break-words" title={tour.destination}>
                                            {tour.destination}
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 text-center">
                                        <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                                            {tour.quantity}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4 text-center">
                                        <span className="text-sm text-green-600 bg-green-50 px-2 py-1 rounded-lg border border-green-100">
                                            {formatPrice(tour.adult_price)}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4 text-center">
                                        <span className="text-sm text-green-600 bg-green-50 px-2 py-1 rounded-lg border border-green-100">
                                            {formatPrice(tour.child_price)}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4 text-center">
                                        <div className="flex flex-col space-y-1">
                                            <span className="text-xs text-gray-500">From</span>
                                            <span className="text-sm text-gray-600 bg-indigo-50 px-2 py-1 rounded-lg mb-1">
                                                {formatDate(tour.departure_date)}
                                            </span>
                                            <span className="text-xs text-gray-500">To</span>
                                            <span className="text-sm text-gray-600 bg-indigo-50 px-2 py-1 rounded-lg">
                                                {formatDate(tour.end_date)}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4">
                                        {tour.Images && tour.Images.length > 0 ? (
                                            <div className="flex items-center justify-center">
                                            <div className="flex -space-x-3 hover:space-x-1 transition-all duration-300">
                                                {tour.Images.slice(0, 3).map((img, index) => (
                                                <div 
                                                    key={img.id}
                                                    className="relative group"
                                                    onClick={() => openImagePreview(img.image_url, tour.tour_name)}
                                                >
                                                    <img 
                                                        src={`${src}${img.image_url}`}
                                                        alt={`${tour.tour_name} - ${index + 1}`}
                                                        className={`w-10 h-10 object-cover rounded-lg border-2 border-white 
                                                            shadow-md cursor-pointer transform transition-all duration-300
                                                            group-hover:scale-110 group-hover:z-10 hover:ring-2 hover:ring-indigo-400
                                                            ${index === 0 ? 'z-30' : index === 1 ? 'z-20' : 'z-10'}`}
                                                    />
                                                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 rounded-lg transition-opacity"></div>
                                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <Eye className="w-4 h-4 text-white drop-shadow-lg" />
                                                    </div>
                                                </div>
                                                ))}
                                            </div>
                                                {tour.Images.length > 3 && (
                                                    <div className="ml-2 flex items-center justify-center w-6 h-6 bg-indigo-50 text-indigo-600 rounded-full border border-indigo-100 shadow-sm
                                                        text-xs font-medium hover:bg-indigo-100 transition-colors cursor-pointer" 
                                                        title={`${tour.Images.length - 3} more images`}
                                                        onClick={() => openGallery(tour.Images, tour.tour_name)}>
                                                        +{tour.Images.length - 3}
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-center bg-gray-50 px-2 py-1 rounded-lg">
                                                <Image className="w-4 h-4 mr-1 text-gray-400" />
                                                <span className="text-xs text-gray-400">No images</span>
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-4 py-4">
                                        <div className="flex flex-col space-y-1 items-center">
                                            <Link to={`/admin/tour/show/${tour.tour_name}`} state={{ id: tour.id }} className="w-full">
                                                <button className="w-full flex items-center justify-center p-1.5 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors duration-200">
                                                    <Eye className="w-3 h-3 mr-1" />
                                                    <span className="text-xs">View</span>
                                                </button>
                                            </Link>
                                            <Link to={`/admin/tour/edit/${tour.tour_name}`} state={{ id: tour.id }} className="w-full">
                                                <button className="w-full flex items-center justify-center p-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors duration-200">
                                                    <Edit className="w-3 h-3 mr-1" />
                                                    <span className="text-xs">Edit</span>
                                                </button>
                                            </Link>
                                            <button 
                                                onClick={() => destroy(tour.id)}
                                                className="w-full flex items-center justify-center p-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors duration-200"
                                            >
                                                <Trash className="w-3 h-3 mr-1" />
                                                <span className="text-xs">Delete</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" className="px-6 py-10 text-center text-gray-500">
                                        No tours available in the system
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {previewImage && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
                    <div className="relative bg-white rounded-xl overflow-hidden max-w-3xl w-full max-h-screen">
                        <div className="flex justify-between items-center border-b p-4">
                            <h3 className="font-medium text-lg text-gray-800">{previewImage.name}</h3>
                            <button 
                                onClick={closeImagePreview}
                                className="text-gray-500 hover:text-gray-800 transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="p-2 flex items-center justify-center bg-gray-100 overflow-auto h-96">
                            <img 
                                src={previewImage.url} 
                                alt={previewImage.name}
                                className="max-w-full max-h-full object-contain"
                            />
                        </div>
                    </div>
                </div>
            )}


            <style>{`
                .tooltip-container {
                    position: relative;
                }
                .tooltip {
                    position: absolute;
                    top: -30px;
                    left: 50%;
                    transform: translateX(-50%);
                    background-color: rgba(0, 0, 0, 0.8);
                    color: white;
                    padding: 4px 8px;
                    border-radius: 4px;
                    font-size: 12px;
                    white-space: nowrap;
                    opacity: 0;
                    visibility: hidden;
                    transition: all 0.2s;
                    z-index: 40;
                }
                .tooltip-container:hover .tooltip {
                    opacity: 1;
                    visibility: visible;
                }
                
                /* Custom Scrollbar Styles */
                .custom-scrollbar::-webkit-scrollbar {
                    width: 8px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #f1f5f9;
                    border-radius: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #cbd5e1;
                    border-radius: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #94a3b8;
                }
            `}</style>
        </div>
    );
}

export default Tour;