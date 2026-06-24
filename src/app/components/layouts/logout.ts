'use server'

import { cookies } from "next/headers"


export const logoutAction = async () => {
    const cookiesStore = await cookies()
    cookiesStore.delete('user')
}