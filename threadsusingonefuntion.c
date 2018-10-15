#include<stdio.h>
#include<pthread.h>

void *entry_point(void *input){
    int i = (int) input;
    printf("Thread input is %d \n",i);
}

main(){
	
    printf("start of main\n");

    pthread_t thread1, thread2;

    int i = 123;
    pthread_create(&thread1,NULL, entry_point,(void*)i);

    int j = 456;
    pthread_create(&thread1,NULL, entry_point,(void*)j);

    pthread_join(thread1, NULL);
    pthread_join(thread2, NULL);

    printf("\nend of main\n");
}

