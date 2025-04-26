export function Genres({ genres }: { genres: string[] }) {
    return (
        <div className="flex flex-wrap content-start gap-2">
            {genres.map((g, i) => (
                <div
                    key={i}
                    className="bg-(--clr-main3) text-(--clr-main0) h-min px-2 
                        text-sm font-bold rounded-2xl">
                    {g}
                </div>
            ))}
        </div>
    )
}
