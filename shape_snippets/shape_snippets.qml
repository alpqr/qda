import QtQuick 2.0
import QtQuick.Shapes 1.0
import QtQuick.Controls 2.2
import QtQuick.Layouts 1.3

Rectangle {
    id: root
    property color col: "lightsteelblue"
    gradient: Gradient {
        GradientStop { position: 0.0; color: Qt.tint(root.col, "#20FFFFFF") }
        GradientStop { position: 0.1; color: Qt.tint(root.col, "#20AAAAAA") }
        GradientStop { position: 0.9; color: Qt.tint(root.col, "#20666666") }
        GradientStop { position: 1.0; color: Qt.tint(root.col, "#20000000") }
    }

    TabBar {
        id: bar
        width: parent.width
        TabButton {
            text: "Tri 1"
        }
        TabButton {
            text: "Tri 2"
        }
        TabButton {
            text: "Tri 3"
        }
        TabButton {
            text: "Circle"
        }
    }

    StackLayout {
        anchors.fill: parent
        currentIndex: bar.currentIndex
        Item {
            Rectangle {
                anchors.centerIn: parent
                width: 200
                height: 200

                Shape {
                    id: tri1
                    anchors.fill: parent

                    ShapePath {
                        strokeColor: "red"
                        strokeWidth: 4
                        fillColor: "blue"

                        startX: 10; startY: 10
                        PathLine { x: tri1.width - 10; y: tri1.height - 10 }
                        PathLine { x: 10; y: tri1.height - 10 }
                        PathLine { x: 10; y: 10 }
                    }
                }
            }
        }
        Item {
            Rectangle {
                anchors.centerIn: parent
                width: 200
                height: 200

                Shape {
                    id: tri2
                    anchors.fill: parent

                    ShapePath {
                        strokeColor: "red"
                        strokeWidth: 4
                        strokeStyle: ShapePath.DashLine
                        dashPattern: [ 1, 4 ]
                        fillColor: "transparent"

                        startX: 10; startY: 10
                        PathLine { x: tri2.width - 10; y: tri2.height - 10 }
                        PathLine { x: 10; y: tri2.height - 10 }
                        PathLine { x: 10; y: 10 }
                    }
                }
            }
        }
        Item {
            Rectangle {
                anchors.centerIn: parent
                width: 200
                height: 200

                Shape {
                    id: tri3
                    anchors.fill: parent

                    ShapePath {
                        strokeColor: "transparent"

                        fillGradient: LinearGradient {
                            x1: 20; y1: 20
                            x2: 180; y2: 130
                            GradientStop { position: 0; color: "blue" }
                            GradientStop { position: 0.2; color: "green" }
                            GradientStop { position: 0.4; color: "red" }
                            GradientStop { position: 0.6; color: "yellow" }
                            GradientStop { position: 1; color: "cyan" }
                        }

                        startX: 10; startY: 10
                        PathLine { x: tri3.width - 10; y: tri3.height - 10 }
                        PathLine { x: 10; y: tri3.height - 10 }
                        PathLine { x: 10; y: 10 }
                    }
                }
            }
        }
        Item {
            Rectangle {
                anchors.centerIn: parent
                width: 200
                height: 200

                Shape {
                    id: circle
                    anchors.fill: parent
                    property real r: 60

                    ShapePath {
                        strokeColor: "transparent"
                        fillColor: "green"

                        startX: circle.width / 2 - circle.r
                        startY: circle.height / 2 - circle.r
                        PathArc {
                            x: circle.width / 2 + circle.r
                            y: circle.height / 2 + circle.r
                            radiusX: circle.r; radiusY: circle.r
                            useLargeArc: true
                        }
                        PathArc {
                            x: circle.width / 2 - circle.r
                            y: circle.height / 2 - circle.r
                            radiusX: circle.r; radiusY: circle.r
                            useLargeArc: true
                        }
                    }
                }
            }
        }
    }
}
