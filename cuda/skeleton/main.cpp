#include <QGuiApplication>
#include "dummy.h"

int main(int argc, char **argv)
{
    QGuiApplication app(argc, argv);

    Dummy d(nullptr, 128, 128);
    d.run();

    return 0;
}
