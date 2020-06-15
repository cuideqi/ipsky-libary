import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, Validator, NG_VALUE_ACCESSOR } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/internal/operators';

export interface Address {
  province: string;
  city: string;
  county: string;
  detail: string;
}

interface ProvinceOption {
  value: string;
  label: string;
  disabled: boolean;
}

@Component({
  selector: 'ipsky-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: AddressComponent
    }
  ]
})
export class AddressComponent implements OnInit, ControlValueAccessor {
  private static ADDRESS;
  private static addressOb: Observable<any>;
  selectedProvince: string | null = null;
  selectedCity: string | null = null;
  selectedCounty: string | null = null;
  detail_address: string | null = null;

  addressData: object; // 所有的地址数据
  provinceData: Array<ProvinceOption>; // 省列表
  cityData: Array<string>; // 城市数据
  countyData: Array<string>; // 县数据

  onChange: (value: Address) => void;
  onTouch: () => void;
  _disabled = false;

  @Input()
  set disabled(value: boolean) {
    this._disabled = value;
  }

  get disabled() {
    return this._disabled;
  }

  @Input() needDetail = true;
  @Input() width = '176.33333px';

  private static loadAdressMeta(http: HttpClient): Observable<any> {
    if (this.ADDRESS) {
      return of(this.ADDRESS);
    }
    if (this.addressOb) {
      return this.addressOb;
    }
    return (this.addressOb = http.get('../assets/china_address.json').pipe(map(r => (this.ADDRESS = r))));
  }
  constructor(private http: HttpClient) {}

  ngOnInit() {
    if (AddressComponent.ADDRESS) {
      this.setAddress();
    } else {
      AddressComponent.loadAdressMeta(this.http).subscribe(r => {
        this.setAddress();
        this.inintProvinceData();
      });
    }
  }

  writeValue(value: Address) {
    if (value) {
      this.selectedProvince = value.province;
      this.selectedCity = value.city;
      this.selectedCounty = value.county;
      this.detail_address = value.detail;
      if (AddressComponent.ADDRESS) {
        this.inintProvinceData();
      }
    } else {
      this.selectedProvince = null;
      this.selectedCity = null;
      this.selectedCounty = null;
      this.detail_address = null;
    }
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this._disabled = isDisabled;
  }

  private getCityData(address: object): Array<string> {
    return address[this.selectedProvince] ? Object.keys(address[this.selectedProvince]) : null;
  }

  private getCountyData(address: object): Array<string> {
    return address[this.selectedProvince] ? address[this.selectedProvince][this.selectedCity] || null : null;
  }

  private setAddress() {
    this.addressData = AddressComponent.ADDRESS;
    this.provinceData = Object.keys(this.addressData).map(item => {
      return { value: item, label: item, disabled: false };
    });
  }

  private inintProvinceData() {
    if (this.selectedProvince && !this.provinceData.find(item => item.value === this.selectedProvince)) {
      this.provinceData = [{ value: this.selectedProvince, label: this.selectedProvince, disabled: true }, ...this.provinceData];
      this.cityData = this.selectedCity ? [this.selectedCity] : null;
      this.countyData = this.selectedCounty ? [this.selectedCounty] : null;
    } else {
      this.cityData = this.selectedProvince ? this.getCityData(this.addressData) : null;
      this.countyData = this.selectedProvince && this.selectedCity ? this.getCountyData(this.addressData) : null;
    }
  }

  provinceChange() {
    this.cityData = this.selectedProvince ? this.getCityData(this.addressData) : null;
    this.selectedCity = null;
    this.selectedCounty = null;
    this.notifyChange();
  }

  cityChange() {
    this.countyData = this.selectedProvince && this.selectedCity ? this.getCountyData(this.addressData) : null;
    this.selectedCounty = null;
    this.notifyChange();
  }

  countyChange() {
    this.notifyChange();
  }

  detailAddressChange() {
    this.notifyChange();
  }

  private notifyChange() {
    if (this.onChange) {
      this.onChange({
        province: this.selectedProvince,
        city: this.selectedCity,
        county: this.selectedCounty,
        detail: this.detail_address
      });
    }
  }
}
