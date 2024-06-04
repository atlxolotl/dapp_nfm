const handler = async (req: Request): Promise<Response> => {
    const url = new URL(req.url);
    const filePath = url.pathname === "/" ? "/index.html" : url.pathname;

    try {
        const file = await Deno.readFile(`./dist${filePath}`);
        const contentType = getContentType(filePath);

        return new Response(file, {
            status: 200,
            headers: { "content-type": contentType },
        });
    } catch {
        return new Response("Not Found", { status: 404 });
    }
};

const getContentType = (filePath: string): string => {
    if (filePath.endsWith(".html")) return "text/html";
    if (filePath.endsWith(".js")) return "application/javascript";
    if (filePath.endsWith(".css")) return "text/css";
    if (filePath.endsWith(".ts")) return "application/typescript";
    return "application/octet-stream";
};

console.log("HTTP server is running on http://localhost:8000/");
    Deno.serve(handler, { port: 8000 });

