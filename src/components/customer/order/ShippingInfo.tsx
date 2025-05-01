import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {useGetDistrictsQuery, useGetProvincesQuery, useGetWardsQuery} from "@/api/customerApi/address.ts";

interface ShippingInfoProps {
    form: any; // Type của useForm
}

const ShippingInfo: React.FC<ShippingInfoProps> = ({form}) => {
    // get provinces
    const {data: provincesData, isLoading: isProvincesLoading} = useGetProvincesQuery();
    const provinces = provincesData?.results || [];

    // Get a list of district -based districts
    const selectedProvinceId = form.watch('province').split('-')[0]; // Take the provincial ID from the selected value
    const {data: districtsData, isLoading: isDistrictsLoading} = useGetDistrictsQuery(
        selectedProvinceId,
        {skip: !selectedProvinceId}
    );
    const districts = districtsData?.results || [];

    // Get a list of wards/communes based on District
    const selectedDistrictId = form.watch('district').split('-')[0]; // Take the district/district ID from the selected value
    const {data: wardsData, isLoading: isWardsLoading} = useGetWardsQuery(
        selectedDistrictId,
        {skip: !selectedDistrictId}
    );
    const wards = wardsData?.results || [];

    const handleProvinceChange = (value: string) => {
        form.setValue('district', '');
        form.setValue('commune', '');
    };

    const handleDistrictChange = (value: string) => {
        form.setValue('commune', '');

    };


    return (
        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
            <h3 className="text-lg font-bold text-orange-500 mb-4">
                THÔNG TIN GIAO HÀNG
            </h3>
            <div className="space-y-4">
                <div className="flex gap-4">
                    <FormField
                        control={form.control}
                        name="fullName"
                        render={({field}) => (
                            <FormItem className="flex-1">
                                <FormLabel>Họ tên <span
                                    className="text-red-500">*</span></FormLabel>
                                <FormControl>
                                    <Input placeholder="" className="h-10" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="phoneNumber"
                        render={({field}) => (
                            <FormItem className="flex-1">
                                <FormLabel>Số điện thoại <span
                                    className="text-red-500">*</span></FormLabel>
                                <FormControl>
                                    <Input type="tel"
                                           className="h-10"
                                           maxLength={12}
                                           onKeyDown={(e) => {
                                               const allowedKeys = [
                                                   'Backspace',
                                                   'ArrowLeft',
                                                   'ArrowRight',
                                                   'Delete',
                                                   'Tab',
                                               ];
                                               if (!/[0-9]/.test(e.key) && !allowedKeys.includes(e.key)) {
                                                   e.preventDefault(); // The character compartment is not number
                                               }
                                           }}
                                           {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="province"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>
                                Tỉnh / Thành phố <span className="text-red-500">*</span>
                            </FormLabel>
                            <Select
                                onValueChange={(value) => {
                                    field.onChange(value);
                                    handleProvinceChange(value);
                                }}
                                value={field.value}
                                disabled={isProvincesLoading}
                            >
                                <FormControl>
                                    <SelectTrigger className="border-gray-300 rounded-md p-2">
                                        <SelectValue placeholder="Chọn tỉnh / thành phố"/>
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent className='max-h-70'>
                                    {provinces.map((province) => (
                                        <SelectItem
                                            key={province.provinceId}
                                            value={`${province.provinceId.toString()}-${province.provinceName}`}
                                        >
                                            {province.provinceName}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="district"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>
                                Quận / Huyện <span className="text-red-500">*</span>
                            </FormLabel>
                            <Select
                                onValueChange={(value) => {
                                    field.onChange(value);
                                    handleDistrictChange(value);
                                }}
                                value={field.value}
                                disabled={isDistrictsLoading || !selectedProvinceId}
                            >
                                <FormControl>
                                    <SelectTrigger className="h-10 border-gray-300 rounded-md p-2">
                                        <SelectValue placeholder="Chọn quận / huyện"/>
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent className='max-h-70'>
                                    {districts.map((district) => (
                                        <SelectItem
                                            key={district.districtId}
                                            value={`${district.districtId.toString()}-${district.districtName}`}
                                        >
                                            {district.districtName}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="commune"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>
                                Phường / Xã <span className="text-red-500">*</span>
                            </FormLabel>
                            <Select
                                onValueChange={(value) => {
                                    field.onChange(value);
                                }}
                                value={field.value}
                                disabled={isWardsLoading || !selectedDistrictId}
                            >
                                <FormControl>
                                    <SelectTrigger className="h-10 border-gray-300 rounded-md p-2">
                                        <SelectValue placeholder="Chọn phường / xã"/>
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent className='max-h-70'>
                                    {wards.map((ward) => (
                                        <SelectItem key={ward.wardId}
                                                    value={ward.wardName}>
                                            {ward.wardName}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="street"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>
                                Số nhà / Tên đường <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                                <Input
                                    placeholder=""
                                    className="h-10"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="note"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Ghi chú</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder=""
                                    className="h-10"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
            </div>
        </div>
    );
}

export default ShippingInfo;