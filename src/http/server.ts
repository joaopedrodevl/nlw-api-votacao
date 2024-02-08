import fastfy from "fastify";
import { createPoll } from "./routes/create-poll";
import { getPoll } from "./routes/get-poll";
import { voteOnPoll } from "./routes/vote-on-poll";
import cookie from "@fastify/cookie";
import fastifyWebsocket from "@fastify/websocket";
import { pollResults } from "../ws/poll-results";

const app = fastfy();

app.register(cookie, {
    secret: "polls-app-nlw-cookie-secret",
    hook: "onRequest",
})

app.register(fastifyWebsocket);

app.register(createPoll)
app.register(getPoll)
app.register(voteOnPoll)

// websocket
app.register(pollResults)

app.listen({ port: 3333 }).then(() => {
    console.log("Server is running on port 3333");
});
