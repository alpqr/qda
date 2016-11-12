TEMPLATE = app
CONFIG += console

SOURCES = main.cpp

CUDA_SOURCES = dummy.cu

include(../common/cuda.pri)
