type Post = {
  id: number;
  title: string;
  content: string;
};

function Blog(props: { posts: Post[] }) {
  const sidebar = (
    <ul>
      {props.posts.map(post =>
        <li key={post.id}>{post.title}</li>
      )}
    </ul>
  );
  const content = props.posts.map(post => 
    <div key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
    </div>
  );

  return (
    <div>
      {sidebar}
      <hr />
      {content}
    </div>
  )
}

const posts: Post[] = [
  { id: 1, title: "Hello World!", content: "Welcome to learning React!" },
  { id: 2, title: "Installation!", content: "We can install React from npm." },
];

<Blog posts={posts} />
