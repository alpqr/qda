Convert a slightly modified qtdeclarative/examples/quick/canvas/tiger/tiger.js into plain QML using the upcoming PathItem API.

Also includes an alternative where the PathItem JavaScript API is used instead. This eliminates the creation of > 1000 QObjects and
signal-slot connections at the expense of not being able to change properties once the path and the stroke/fill settings are committed.

