import React from 'react';
import { FormField, FormItem, FormControl, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {FormType} from "@/types/order.tsx";

interface PaymentMethodProps {
    form: FormType;
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({ form }) => {
    return (
        <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-bold text-orange-500 mb-4">
                PHƯƠNG THỨC THANH TOÁN
            </h3>
            <FormField
                control={form.control}
                name="paymentMethod"
                render={({field}) => (
                    <FormItem>
                        <FormControl>
                            <RadioGroup
                                onValueChange={field.onChange}
                                value={field.value}
                                className="space-y-2"
                                defaultValue="VNPAY"
                            >
                                <div className="flex items-center p-2 bg-gray-100 rounded-md">
                                    <RadioGroupItem
                                        value={'VNPAY'}
                                        id={'VNPAY'}
                                        className="mr-2"
                                    />
                                    <img
                                        src={'https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-VNPAY-QR-350x65.png'}
                                        alt={'VNPAY'}
                                        className="w-10 mr-2 object-contain"
                                    />
                                    <label htmlFor={'VNPAY'} className="cursor-pointer">
                                        Thanh toán qua VNPAY
                                    </label>
                                </div>

                                <div className="flex items-center p-2 bg-gray-100 rounded-md">
                                    <RadioGroupItem
                                        value={'MOMO'}
                                        id={'MOMO'}
                                        className="mr-2"
                                    />
                                    <img
                                        src={'https://cdn.prod.website-files.com/64199d190fc7afa82666d89c/6491bee997eba92836f95d0c_momo_wallet.png'}
                                        alt={'MOMO'}
                                        className="w-10 mr-2 object-contain"
                                    />
                                    <label htmlFor={'MOMO'} className="cursor-pointer">
                                        Thanh toán qua Momo
                                    </label>
                                </div>

                            </RadioGroup>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
            />
        </div>
    );
};

export default PaymentMethod;