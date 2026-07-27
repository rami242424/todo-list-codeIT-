
export default async function Pages({ params } : {params: Promise<{itemId: string}>}){
    const {itemId} = await params;

}