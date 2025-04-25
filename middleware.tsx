import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { jwtDecode } from 'jwt-decode'
interface TokenPayload {
    user_id: string;
    exp: number;
    iat: number;
    jti: string;
    token_type: string;
    is_admin: boolean;
}


// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    // return NextResponse.redirect(new URL('/home', request.url))

    console.log('i am here')

    const access_token = request.cookies.get('access');
    console.log(access_token)

    if (!access_token) {
        console.log('no tokens')
        return NextResponse.redirect(new URL('/', request.url))
    }

    try {
        const decoded_token = jwtDecode<TokenPayload>(access_token.value);
        const is_admin = decoded_token?.is_admin;

        if (!is_admin) {
            console.log('not an admin')
            return NextResponse.redirect(new URL('/', request.url))
        }
    }
    catch (error) {
        console.error('token is invalid', error)
        return NextResponse.redirect(new URL('/', request.url)); // Redirect if token is invalid
    }

    // //sabai thik xa vani request lai allow gara
    // return NextResponse.next()


}

// /adminsite paxi j j pani endpoint aauxa all passess via this middleware
export const config = {
    matcher: ['/adminsite/:path*'],
}