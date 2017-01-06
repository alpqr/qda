Qt-based CUDA playground, targeting Windows and the Jetson TX1.

Tested on Windows only for now. (CUDA 8.0, MSVC 2015, Qt dev (5.9) branch)

Edit common/cuda.pri as appropriate. This is an updated version of the qmake rule
from https://blog.qt.io/blog/2015/03/03/qt-weekly-28-qt-and-cuda-on-the-jetson-tk1/
since it turns out adapting to Windows is not as trivial as the article suggested.
