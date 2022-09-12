# svelte - presenter

A minimal presentation package for Svelte, includes synchronized "Presenter" and "Presentation" views.

## Adding Slides

All slides are simple routes.
The examples use mdsvex but that is not required.

In `+layout.svelte` there is a constant called `slides` that holds the order of them:

```js
const slides = ['welcome', 'intro'];
```

## Changing Slides

Use `ArrowLeft` and `ArrowRight` to move through the slides.

## Presentation View

The presentation view can be opened by adding `?presentation` to the url.

## Presenter View and Notes

A special `PresenterNotes` component has been added, this only show in pages without `?presentation`

TODO: add this as a shortcode instead ?

## Styling and Stuff

DIY :)
