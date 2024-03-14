
using AutoMapper;
using Humanizer;
using SharpCompress.Common;
using System;
using System.Linq;
using System.Data;
using Nest;

namespace AVEGIC.Common
{
    public  class EntityMapper
    {
    
        //private object DynamicMapping(object source, object destination, ResolutionContext context)
        //{
        //    Type sourceType = source.GetType();
        //    var destinationType = destination.GetType();

        //    var sourceProperties = sourceType.GetProperties();
        //    var destinationProperties = destinationType.GetProperties();

        //    foreach (var destProp in destinationProperties)
        //    {
        //        var sourceProp = sourceProperties.FirstOrDefault(p => p.Name == destProp.Name);
        //        if (sourceProp != null)
        //        {
        //            var value = sourceProp.GetValue(source);
        //            destProp.SetValue(destination, value);
        //        }
        //    }

        //    return destination;
        //}
        public static TDestination Map<TSource, TDestination>(TSource source)
        {
            var destinationProperties = typeof(TDestination).GetProperties();
            var sourceProperties = typeof(TSource).GetProperties();

            var destination = Activator.CreateInstance<TDestination>();

            foreach (var destProperty in destinationProperties)
            {
                var sourceProperty = sourceProperties.FirstOrDefault(p => p.Name == destProperty.Name);

                if (sourceProperty != null && sourceProperty.PropertyType == destProperty.PropertyType)
                {
                    var value = sourceProperty.GetValue(source);
                    destProperty.SetValue(destination, value);
                }
            }

            return destination;
        }

        public static TDes CopyProperties<TSrc,TDes>(TSrc src,TDes des)
        {
            var destinationProperties = typeof(TDes).GetProperties();
            var sourceProperties = typeof(TSrc).GetProperties();

            //des = Activator.CreateInstance<TDes>();

            foreach (var destProperty in destinationProperties)
            {
                var sourceProperty = sourceProperties.FirstOrDefault(p => p.Name == destProperty.Name);

                if (sourceProperty != null && sourceProperty.PropertyType == destProperty.PropertyType)
                {
                    var value = sourceProperty.GetValue(src);
                    destProperty.SetValue(des, value);
                }
            }

            return des;
        }
    }
}
