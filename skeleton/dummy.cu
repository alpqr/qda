#include "dummy.h"
#include <cuda.h>

__global__ void kernel(uchar4 *ptr)
{
    int x = threadIdx.x + blockIdx.x * blockDim.x;
    int y = threadIdx.y + blockIdx.y * blockDim.y;
    int offset = x + y * blockDim.x * gridDim.x;
    // ...
}

void Dummy::run()
{
    const int blockSize = 16;
    kernel<<<dim3(m_w / blockSize, m_h / blockSize), dim3(blockSize, blockSize)>>>((uchar4 *) m_devPtr);
}
