CUDA_ARCH = sm_52

win32 {
    CUDA_DIR = c:/cuda
    CUDA_LIBDIR = $$CUDA_DIR/lib/x64
    # for nmake
    CUDA_NVCC = nvcc_wrapper
} else {
    CUDA_DIR = /usr/local/cuda
    CUDA_LIBDIR = $$CUDA_DIR/lib
    CUDA_NVCC = $$CUDA_DIR/bin/nvcc
}

CONFIG(debug, debug|release) {
    CUDA_FLAGS = -g -G
    win32 {
        CUDA_FLAGS += -Xcompiler /MDd
        CUDA_OBJDIR = debug
    }
} else {
    CUDA_FLAGS = -O2
    win32 {
        CUDA_FLAGS += -Xcompiler /MD
        CUDA_OBJDIR = release
    }
}

INCLUDEPATH += $$CUDA_DIR/include
LIBS += -L$$CUDA_LIBDIR -lcudart -lcuda
osx: LIBS += -F/Library/Frameworks -framework CUDA

cuda.commands = $$CUDA_NVCC -c -arch=$$CUDA_ARCH $$CUDA_FLAGS -o ${QMAKE_FILE_OUT} ${QMAKE_FILE_NAME}
# the deps result does not seem to be parsed correctly by qmake on Windows, so disable for now.
# cuda.dependency_type = TYPE_C
# cuda.depend_command = $$CUDA_NVCC -M {QMAKE_FILE_NAME}
cuda.input = CUDA_SOURCES
win32 {
    cuda.output = $$CUDA_OBJDIR/${QMAKE_FILE_BASE}_cuda.obj
} else {
    cuda.output = ${QMAKE_FILE_BASE}_cuda.o
}

QMAKE_EXTRA_COMPILERS += cuda
