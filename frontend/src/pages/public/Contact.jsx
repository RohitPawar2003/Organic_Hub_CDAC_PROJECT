import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => {
    return (
        <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center mb-16">
                    <h2 className="text-base font-semibold leading-7 text-indigo-600">Contact Us</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Get in Touch
                    </p>
                </div>
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
                    <div className="flex flex-col items-center p-6 bg-gray-50 rounded-lg">
                        <Mail className="h-8 w-8 text-indigo-600 mb-4" />
                        <h3 className="text-lg font-semibold">Email</h3>
                        <p className="text-gray-600">support@organichub.com</p>
                    </div>
                    <div className="flex flex-col items-center p-6 bg-gray-50 rounded-lg">
                        <Phone className="h-8 w-8 text-indigo-600 mb-4" />
                        <h3 className="text-lg font-semibold">Phone</h3>
                        <p className="text-gray-600">8888888888</p>
                    </div>
                    <div className="flex flex-col items-center p-6 bg-gray-50 rounded-lg">
                        <MapPin className="h-8 w-8 text-indigo-600 mb-4" />
                        <h3 className="text-lg font-semibold">Address</h3>
                        <p className="text-gray-600">Akurdi, Pune</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
