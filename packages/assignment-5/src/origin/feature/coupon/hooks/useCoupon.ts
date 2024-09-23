import { useState } from "react";
import { Coupon } from "../../../../types";

export const useCoupon = (coupon: Coupon[]) => {
  const [coupons, setCoupons] = useState<Coupon[]>(coupon);

  const addCoupon = (newCoupon: Coupon) => {
    setCoupons((prevCoupons) => [...prevCoupons, newCoupon]);
  };

  return { coupons, addCoupon };
};
