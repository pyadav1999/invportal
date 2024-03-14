using AutoMapper;

namespace AVEGIC.Common
{
    public class EntityDtoService
    {
        private readonly IMapper _mapper;

        public EntityDtoService(IMapper mapper)
        {
            _mapper = mapper;
        }

        public TDto MapEntityToDto<TEntity, TDto>(TEntity entity)
        {
            TDto dto = _mapper.Map<TDto>(entity);
            return dto;
        }

        public TEntity MapDtoToEntity<TDto, TEntity>(TDto dto)
        {
            TEntity entity = _mapper.Map<TEntity>(dto);
            return entity;
        }
        public TDestination Map<TSource, TDestination>(TSource source)
        {
            var sourceType = typeof(TSource);
            var destinationType = typeof(TDestination);

            var mappedResult = _mapper.Map(source, sourceType, destinationType);
            return (TDestination)mappedResult;
           // return _mapper.Map<TSource, TDestination>(source);
        }
    }
}
