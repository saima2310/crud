const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

let blogs = [
  {
    id: uuidv4(),
    username: "Adam Eve",
    content:
      "In life, friendships and connections change. Sometimes people we thought would always be a part of our lives move away, and relationships evolve. Closure, the understanding and acceptance of these changes, doesn't always come with a clear explanation. People may not always provide the closure we seek. Silence or a lack of communication can be their way of expressing that things have changed. It's not necessarily a reflection of our worth; it's just a part of life. As we go through life, not everyone we meet will stay with us forever. Some relationships are temporary, and that's okay. Closure isn't always a big conversation; it's often a personal process of accepting that things have shifted.",
  },
  {
    id: uuidv4(),
    username: "John Doe",
    content:
      "In the intricate web of friendship, the ache becomes profound when heartfelt efforts and bestowed importance are met with the disheartening echo of being taken for granted. It's a complex symphony of emotions, where the lingering resonance of unreciprocated significance paints a picture of an uneven connection. Yet, within this emotional complexity, a persistent hope remains, a belief that amidst the ebb and flow of shared experiences, the cadence of appreciation may harmonize, weaving together the threads of what was once a treasured and balanced bond.",
  },
  {
    id: uuidv4(),
    username: "Saima Zaki",
    content:
      "In the poignant symphony of friendship, the heartache resonates when the efforts and significance bestowed upon someone are met with the dissonance of being taken for granted. It's a painful melody, where the echoes of unreciprocated importance linger. The realization of investing in a connection that feels one-sided becomes a heavy note in the soul's composition. Yet, even in the face of such discord, there remains a hopeful chord, a belief that someday the rhythm of appreciation will harmonize, mending the broken strains of what was once a cherished bond.",
  },
  {
    id: uuidv4(),
    username: "Smith Jonas",
    content:
      "In nature's ballet, rain takes center stage, its gentle notes tapping on rooftops, narrating tales of renewal. Each droplet, a liquid storyteller, paints the world in hues of nostalgia, turning ordinary scenes into extraordinary moments. The rain, a poetic dance with the earth, whispers resilience and beauty, a reminder that even in storms, there's a serene melody playing, lulling the world into a tranquil embrace of rebirth.",
  },
  {
    id: uuidv4(),
    username: "Anonymous",
    content:
      "In the intricate tapestry of camaraderie, the poignant resonance of heartache reverberates when earnest endeavors and bestowed significance are met with the disheartening dissonance of being taken for granted. It becomes a dolorous melody, where the echoes of unreciprocated importance linger, a realization that the investment in a connection feels asymmetrical. Yet, within the depths of this emotional composition, a lingering hope persists, a belief that in the temporal journey of shared experiences, the rhythms of appreciation may one day coalesce, mending the frayed strands of what was once a harmonious and cherished bond.",
  },
  {
    id: uuidv4(),
    username: "jane Doe",
    content:
      "In the intricate tapestry of camaraderie, the poignant resonance of heartache reverberates when earnest endeavors and bestowed significance are met with the disheartening dissonance of being taken for granted. It becomes a dolorous melody, where the echoes of unreciprocated importance linger, a realization that the investment in a connection feels asymmetrical. Yet, within the depths of this emotional composition, a lingering hope persists, a belief that in the temporal journey of shared experiences, the rhythms of appreciation may one day coalesce, mending the frayed strands of what was once a harmonious and cherished bond.",
  },
];

app.get("/posts", (req, res) => {
  res.render("index.ejs", { blogs });
});

app.get("/posts/new", (req, res) => {
  // res.send('requset sent')
  res.render("new.ejs");
});

app.post("/posts", (req, res) => {
  let { username, content } = req.body;
  console.log(req.body);
  let id = uuidv4();
  blogs.push({ id, username, content });
  res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  let blog = blogs.find((b) => id === b.id);
  //   console.log(blog);
  // res.send('working')
  res.render("show", { blog });
});

app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  let newContent = req.body.content;
  let blog = blogs.find((p) => id === p.id);
  blog.content = newContent;
  console.log(blog);
  console.log(newContent);
  // res.send("working");
  console.log(id);
  res.redirect("/posts");
});

app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;
  let blog = blogs.find((b) => id === b.id);
  res.render("edit.ejs", { blog });
});

app.delete("/posts/:id", (req, res) => {
  let { id } = req.params;
  blogs = blogs.filter((p) => id !== p.id);
  //   res.send("delete req sent");
  res.redirect("/posts");
});

app.listen(port, (req, res) => {
  console.log(`app is listening to port ${port}`);
});
