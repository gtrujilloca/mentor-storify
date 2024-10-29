import { HttpContext, HttpContextToken } from "@angular/common/http";

export const INCLUDE_TOKEN = new HttpContextToken<boolean>(() => false);

export function addToken() {
    return new HttpContext().set(INCLUDE_TOKEN, true);
}