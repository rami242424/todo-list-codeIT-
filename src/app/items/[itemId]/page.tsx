
export default async function Page({ params } : {params: Promise<{itemId: string}>}){
    const {itemId} = await params;

}