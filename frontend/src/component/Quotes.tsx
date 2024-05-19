 const Quotes = () => {
    return(
        <div className="hidden items-center justify-center p-6 lg:flex lg:bg-gray-100 lg:p-10 dark:lg:bg-gray-800">
            <div className="mx-auto grid max-w-[350px] gap-3 lg:max-w-[500px]">
            <blockquote className="text-lg font-semibold leading-snug lg:text-xl lg:leading-normal xl:text-2xl">
                “The customer service I received was exceptional. The support team went above and beyond to address my
                concerns.“
            </blockquote>
            <div>
                <div className="font-semibold">Jules Winnfield</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">CEO, Acme Inc</div>
            </div>
            </div>
        </div>
    )
}

export default Quotes