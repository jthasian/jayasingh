package com.example.config;

import org.bson.BsonUndefined;
import org.springframework.core.convert.converter.Converter;
import org.springframework.core.convert.converter.ConverterFactory;

public class BsonUndefinedToNullObjectConverterFactory implements ConverterFactory<BsonUndefined, Object> {
    @Override
    public <T extends Object> Converter<BsonUndefined, T> getConverter(Class<T> targetType) {
        return o -> null;
    }
}
