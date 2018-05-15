## What is gdrJS?

gdrJS is a fast, small, and feature-rich JavaScript library. It makes things like HTML document traversal and manipulation, event handling, animation, and Ajax much simpler with an easy-to-use API that works across a multitude of browsers. With a combination of versatility and extensibility, gdrJS has changed the way that millions of people write JavaScript.

### DOM Traversal and Manipulation

Get the <button> element with the class 'continue' and change its HTML to 'Next Step...
  
```markdown
$( "button.continue" ).html( "Next Step..." )
```

For more details see [GitHub Flavored Markdown](https://guides.github.com/features/mastering-markdown/).

### Ajax

Call a local script on the server /api/getData with the query parameter zipcode=97201 and replace the element #data-temp's html with the returned text

```markdown
$.ajax({
  url: "/api/getData",
  data: {
    id: 236
  },
  success: function( result ) {
    $( "#data-temp" ).html( "<strong>" + result + "</strong> degrees" );
  }
});
```

### Including gdrJS

Below are some of the most common ways to include gdrJS.

```markdown
<script src="gdr.js"></script>
```
