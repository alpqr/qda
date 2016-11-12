#ifndef DUMMY_H
#define DUMMY_H

class Dummy {
public:
    Dummy(void *devPtr, int w, int h) :
        m_devPtr(devPtr), m_w(w), m_h(h) { }

    void run();

private:
    void *m_devPtr;
    int m_w;
    int m_h;
};

#endif
