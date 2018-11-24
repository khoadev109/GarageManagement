import React from "react";
import { SortWise, sortByOrder } from "../../library/array";

export interface IProvince {
    prov_id: number,
    prov_name: string
}

export interface IDistrict {
    dist_id: number,
    dist_name: string,
    dist_prov_id: number
}

export interface IWard {
    ward_id: number,
    ward_name: string,
    ward_dist_id: number
}

export interface IProvinces extends SortWise {
    list: Array<IProvince>
}

export interface IDistricts extends SortWise {
    list: Array<IDistrict>
}

export interface IWards extends SortWise {
    list: Array<IWard>
}

export function renderProvince(provinces: Array<IProvince>) {
    const provincesSorting = { Array: provinces, NameToSort: "prov_name" };
    if (provincesSorting.Array.length) {
        sortByOrder(provincesSorting);

        return (
            provincesSorting.Array.map((province, i) => { 
                return (
                    <option value={province.prov_id} key={i} data-store-value={province.prov_name}>
                        {province.prov_name}
                    </option>
                ) 
            })
        );
    }
    return null;
}

export function renderDistrict(districts: Array<IDistrict>, provinceId: any) {
    if (!provinceId)
        return null;

    const filteredDistricts = { Array: districts.filter(x => x.dist_prov_id == provinceId), NameToSort: "dist_name" };
    if (filteredDistricts.Array.length) {
        sortByOrder(filteredDistricts);

        return (
            filteredDistricts.Array.map((district, i) => { 
                return (
                    <option value={district.dist_id} key={i} data-store-value={district.dist_name}>
                        {district.dist_name}
                    </option>
                ) 
            })
        );
    }
    return null;
}

export function renderWard(wards: Array<IWard>, districtId: any) {
    if (!districtId)
        return null;

    const filteredWards = { Array: wards.filter(x => x.ward_dist_id == districtId), NameToSort: "ward_name" };
    if (filteredWards.Array.length) {
        sortByOrder(filteredWards);

        return (
            filteredWards.Array.map((ward, i) => { 
                return (
                    <option value={ward.ward_id} key={i} data-store-value={ward.ward_name}>
                        {ward.ward_name}
                    </option>
                ) 
            })
        );
    }
    return null;
}

export function renderProvinceById(provinces: Array<IProvince>, provinceId: any) : string {
    const filteredProvinces = provinces.filter(x => x.prov_id == provinceId);
    const provinceName = filteredProvinces ? filteredProvinces[0].prov_name : "";
    return provinceName;
}

export function renderDistrictById(districts: Array<IDistrict>, districtId: any) : string {
    const filteredDistricts = districts.filter(x => x.dist_id == districtId);
    const districtName = filteredDistricts ? filteredDistricts[0].dist_name : "";
    return districtName;
}

export function renderWardById(wards: Array<IWard>, wardId: any) : string {
    const filteredWards = wards.filter(x => x.ward_id == wardId);
    const wardName = filteredWards ? filteredWards[0].ward_name : "";
    return wardName;
}
