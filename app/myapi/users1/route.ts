import { NextResponse } from "next/server"
const users1=[
    {
        "id":"1",
        "name":"Fahad",
        "contactNum":"8246876723878",
        "address":"Islamabad"
    },
    {
        "id":"2",
        "name":"Ali",
        "contactNum":"893578917581782676476",
        "address":"karachi"
    }
]
export function GET(){
    return NextResponse.json(users1)
}
export async function POST(request:Request){
    const data1=await request.json()
    users1.push(data1)
    return NextResponse.json({"Data":"successfully posted"})
}