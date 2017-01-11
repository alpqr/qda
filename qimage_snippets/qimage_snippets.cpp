#include <QGuiApplication>
#include <QPainter>
#include <QImage>

void paintIntoImage()
{
    QImage img(640, 480, QImage::Format_ARGB32_Premultiplied);
    img.fill(Qt::transparent);

    QPainter p(&img);
    p.fillRect(10, 10, 50, 50, Qt::red);
    p.end();

    img.save("paint_into_image_output.png");
}

void paintIntoExternalImage()
{
    const int W = 640, H = 480, SZ = W * H * 4;

    unsigned char *buf = new unsigned char[SZ];
    memset(buf, 0, SZ);

    QImage wrapper(buf, W, H, QImage::Format_ARGB32_Premultiplied);

    QPainter p(&wrapper);
    p.fillRect(10, 10, 50, 50, Qt::red);
    p.end();

    wrapper.save("paint_into_external_image_output.png");

    delete buf;
}

void drawStuff_Wrong(QImage image) // pass by value; will just increase ref due to implicit sharing
{
    QPainter p(&image); // oops: image will detach (make a copy) due to refcount > 1
    p.fillRect(10, 10, 50, 50, Qt::red);
}

/*
void drawStuff_Good(QImage *image) // or by non-const ref
{
    QPainter p(image);
    p.fillRect(10, 10, 50, 50, Qt::red);
}
*/

void paintIntoExternalImage_Wrong()
{
    const int W = 640, H = 480, SZ = W * H * 4;

    unsigned char *buf = new unsigned char[SZ];
    memset(buf, 0, SZ);

    QImage wrapper(buf, W, H, QImage::Format_ARGB32_Premultiplied);
    drawStuff_Wrong(wrapper);

    wrapper.save("paint_into_external_image_wrong_output.png");

    delete buf;
}

int main(int argc, char **argv)
{
    QGuiApplication app(argc, argv);

    paintIntoImage();
    paintIntoExternalImage();
    paintIntoExternalImage_Wrong();
    
    return 0;
}
