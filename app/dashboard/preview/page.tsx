
import HtmlPreviewer from "./htmlpreveiwer";



export default function Page () {
    /*  */

    return (
        <div className="flex flex-col ">
            <h1 className="pl-4 scroll-m-20 text-4xl font-extrabold text-slate-700 tracking-tight lg:text-4xl">this is a previewer to test your html template code before you send it to your subscribers .</h1>
            <HtmlPreviewer/>
            </div>
    )
}