FROM eclipse-temurin:17-jdk-alpine
WORKDIR /
VOLUME /tmp
COPY target/*.jar ecom-back.jar
ENTRYPOINT ["java","-jar","ecom-back.jar"]
