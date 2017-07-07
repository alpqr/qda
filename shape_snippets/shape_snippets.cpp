#include <QGuiApplication>
#include <QQuickView>

int main(int argc, char **argv)
{
    QGuiApplication app(argc, argv);

    QQuickView view;

    if (QCoreApplication::arguments().contains(QStringLiteral("--multisample"))) {
        QSurfaceFormat fmt;
        fmt.setDepthBufferSize(24);
        fmt.setStencilBufferSize(8);
        fmt.setSamples(4);
        view.setFormat(fmt);
    }

    view.setResizeMode(QQuickView::SizeRootObjectToView);
    view.setSource(QUrl("qrc:/shape_snippets.qml"));
    view.resize(1024, 768);
    view.show();

    return app.exec();
}
