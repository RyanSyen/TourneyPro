import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest){
    
    return NextResponse.json({message: "Test"}, {status: 200});
}

export async function POST(request: Request) {

    return NextResponse.json({message: "Test"}, {status: 200}); 
}
 
export async function PUT(request: Request) {
    return NextResponse.json({message: "Test"}, {status: 200});
}
 
export async function DELETE(request: Request) {
    return NextResponse.json({message: "Test"}, {status: 200});

}