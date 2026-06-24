import { console } from "inspector";
import { NextRequest, NextResponse } from "next/server";

export type IRole = 'USER' | 'HOTEL'
export interface IUser {
   name: string,
   no_hp: string,
   email: string,
   alamat: string,
   role: IRole
}

export function proxy (request: NextRequest) {
    const userCookies= request.cookies.get("user")?.value;

    const { pathname } = request.nextUrl;

    const toUserPage = pathname.startsWith("/user")
    const toAdminPage = pathname.startsWith("/admin")
    const isNeedSession = toUserPage || toAdminPage

    if (isNeedSession){
       if (!userCookies){
        return NextResponse.redirect(new URL("/", request.url));
       }
       const user = JSON.parse(userCookies) as IUser

      if (toAdminPage && user.role !== 'USER') {
         return NextResponse.redirect(new URL("/", request.url));
      }

       if (toUserPage && user.role !== 'HOTEL') {
          return NextResponse.redirect(new URL("/", request.url));
      }
    }


    return NextResponse.next()
}